'use strict';

// Load modules

const Items = require('items');
const Piloted = require('piloted');
const Seneca = require('seneca');


const ignore = () => {};

const smartthings = Seneca();
smartthings.client({
  host: process.env.SMARTTHINGS_HOST,
  port: process.env.SMARTTHINGS_PORT
});

const serializer = Seneca();
serializer.client({
  host: process.env.SERIALIZER_HOST,
  port: process.env.SERIALIZER_PORT
});

const readData = function () {
  smartthings.act({
    role: 'smartthings',
    cmd: 'read',
    type: 'humidity',
    ago: 2
  }, (err, data) => {
    if (err) {
      console.error(err);
      return readAgain();
    }

    if (!data || !data.length) {
      return readAgain();
    }

    data = [].concat.apply([], data);

    serializer.ready(() => {
      Items.serial(data, (point, next) => {
        serializer.act({ role: 'serialize', cmd: 'write', type: 'humidity', value: point.value }, next);
      }, (err) => {
        readAgain();
      });
    });
  });
};

const readAgain = function () {
  setTimeout(readData, 5000);
};

readData();
