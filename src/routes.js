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
routes.get('/user', UserController.getUserByPhone);
routes.get('/goals', GoalController.getAllGoalsByUserPhone);
routes.delete('/goal', GoalController.deleteGoalById);
routes.post('/spending', SpendingController.create);
routes.get('/spendings', SpendingController.getAllspendings);
routes.delete('/spending', SpendingController.deleteSpendingById);
routes.use(authMiddleware);

module.exports = routes;