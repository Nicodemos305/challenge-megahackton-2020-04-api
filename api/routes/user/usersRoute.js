module.exports = app => {
  const listUsersController = require('../../controllers/user/listUserController')();
  const getUserController = require('../../controllers/user/getUserController')();
  const createUserController = require('../../controllers/user/createUserController')();

  app.route('/api/v1/users').get(listUsersController.listUsers);
  app.route('/api/v1/user').get(getUserController.getUser);
  app.route('/api/v1/user').post(createUserController.createUser);

}