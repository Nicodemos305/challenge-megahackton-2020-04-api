const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

require('./database');

class App {

  PATH_BASE = '/api/v1';

  constructor() {
    this.server = express();
    this.configCors();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(this.PATH_BASE, routes);
  }

  configCors() {
    this.server.use(cors());
  }
}

module.exports = new App().server;