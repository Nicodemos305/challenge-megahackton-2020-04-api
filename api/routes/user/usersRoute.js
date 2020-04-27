module.exports = app => {
  const listUsersController = require('../../controllers/user/listUserController')();
  const getUserController = require('../../controllers/user/getUserController')();

  app.route('/api/v1/users').get(listUsersController.listUsers);
  app.route('/api/v1/user').get(getUserController.getUser);
}