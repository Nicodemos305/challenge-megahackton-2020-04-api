const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const userRoute = require('../api/routes/user/usersRoute');

module.exports = () => {
  const app = express();

  app.set('port', process.env.PORT || config.get('server.port'));
  app.use(bodyParser.json());
  userRoute(app);
  // require('../api/routes/user/usersRoute')(app);
  require('../api/routes/goals/goalsRoute')(app);

  return app;
};