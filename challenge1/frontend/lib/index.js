'use strict';

// Load modules

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
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

  server.start(() => {
    console.log(`listening at http://localhost:${server.info.port}`);
    startReading(server.listener);
  });
});

const startReading = function (listener) {
  const webStream = WebStream(listener);

  let lastEmitted = 0;
  let i = 0;
  setInterval(() => {
    webStream.emit([{
      type: 'temperature',
      time: Date.now(),
      value: Math.floor(Math.random() * 100)
    }]);
  }, 1000);
};
