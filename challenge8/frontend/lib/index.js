'use strict';

// Load modules

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Piloted = require('piloted');
const Seneca = require('seneca');
const WebStream = require('./webStream');



const serverConfig = {
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
};

const server = new Hapi.Server(serverConfig);
server.connection({ port: process.env.PORT });
server.register([Inert], () => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  });

  startReading(server.listener);

  server.start(() => {
    console.log(`listening at http://localhost:${server.info.port}`);
  });
});

function startReading (listener) {
  const webStream = WebStream(listener);
  const seneca = Seneca();

  seneca.client({
    host: process.env.SERIALIZER_HOST,
    port: process.env.SERIALIZER_PORT
  });

  let lastEmitted = 0;
  let i = 0;
  setInterval(() => {
    seneca.act({
      role: 'serialize',
      cmd: 'read',
      ago: 5                // Minutes ago
    }, (err, points) => {
      if (err) {
        console.error(err);
      }

      if (!points || !points.length) {
        return;
      }

      let toEmit = [];
      points = [].concat.apply([], points);
      points.forEach((point) => {
        point.time = (new Date(point.time)).getTime();

        if (point.time > lastEmitted) {
          lastEmitted = point.time;
          toEmit.push(point);
        }
      });

      if (toEmit.length) {
        webStream.emit([].concat.apply([], toEmit));
      }
    });
  }, 2000);
}
