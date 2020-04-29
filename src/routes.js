const { Router } = require('express');
const LoginController =  require('./app/controllers/LoginController');
const SessionController =  require('./app/controllers/SessionController');
const UserController =  require('./app/controllers/UserController');
const authMiddleware = require('./app/middleware/auth');

const routes = new Router();

routes.post('/register', LoginController.create);
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.create);
routes.use(authMiddleware);

module.exports = routes;