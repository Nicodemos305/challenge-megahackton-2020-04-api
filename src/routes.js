const { Router } = require('express');
const LoginController =  require('./app/controllers/LoginController');
const SessionController =  require('./app/controllers/SessionController');
const UserController =  require('./app/controllers/UserController');
const GoalController =  require('./app/controllers/GoalController');
const SpendingController =  require('./app/controllers/SpendingController');

const authMiddleware = require('./app/middleware/auth');

const routes = new Router();

routes.put('/confirmation', LoginController.confirmationLogin);
routes.post('/registers', LoginController.create);
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.create);
routes.get('/users', UserController.getUserByPhone);
routes.get('/goals', GoalController.getAllGoals);
routes.post('/spending', SpendingController.create);
routes.get('/spending', SpendingController.getAllspendings);

routes.use(authMiddleware);

module.exports = routes;