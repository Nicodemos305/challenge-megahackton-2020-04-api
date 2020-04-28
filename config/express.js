const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const userRoute = require('../api/routes/user/usersRoute');
const sessionController = require('../api/controllers/sessions/sessionController');
const cors = require('cors')

module.exports = () => {
  const app = express();

  app.set('port', process.env.PORT || config.get('server.port'));
  app.use(cors());
  app.use(bodyParser.json());

  app.post('/api/v1/sessions', sessionController.store);

  userRoute(app);
  // require('../api/routes/user/usersRoute')(app);
  require('../api/routes/goals/goalsRoute')(app);

  return app;
};