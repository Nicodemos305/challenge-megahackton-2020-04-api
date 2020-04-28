const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const mongoose = require('mongoose');

module.exports = () => {
  const app = express();
  mongoose.connect('mongodb://localhost:27017/financialdb');
  require('../api/data/userModel');

  app.set('port', process.env.PORT || config.get('server.port'));
  app.use(bodyParser.json());
  require('../api/routes/user/usersRoute')(app);
  require('../api/routes/goals/goalsRoute')(app);

  return app;
};