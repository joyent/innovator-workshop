'use strict';

const Path = require('path');
const Hapi = require('hapi');
const HapiReveal = require('hapi-reveal');
const Inert = require('inert');
const Vision = require('vision');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 8080 });

server.register([Vision, Inert, HapiReveal], (err) => {
  if (err) {
    console.error('Failed to load plugin:', err);
    process.exit(1);
  }
});

server.start(() => {
  console.log(`Presentation Started: http://localhost:${server.info.port}`);
});
