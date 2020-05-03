const { Router } = require('express');
const LoginController =  require('./app/controllers/LoginController');
const SessionController =  require('./app/controllers/SessionController');
const UserController =  require('./app/controllers/UserController');
const GoalController =  require('./app/controllers/GoalController');
const SpendingController =  require('./app/controllers/SpendingController');
const FinancialAccountController = require('./app/controllers/FinancialAccountController');

const authMiddleware = require('./app/middleware/auth');

const routes = new Router();

routes.put('/confirmation', LoginController.confirmationLogin);
routes.post('/registers', LoginController.create);
routes.post('/sessions', SessionController.store);

routes.post('/goal', GoalController.create);
routes.get('/goals', GoalController.getAllGoalsByUserPhone);
routes.delete('/goal', GoalController.deleteGoalById);

routes.post('/financialAccount', FinancialAccountController.create);
routes.get('/financialAccount', FinancialAccountController.getFinancialAccountsByUserPhone);
routes.put('/depositFinancialAccount', FinancialAccountController.depositFinancialAccount);

routes.use(authMiddleware);

routes.post('/users', UserController.create);
routes.get('/users', UserController.getUserByPhone);

routes.post('/spendings', SpendingController.create);
routes.get('/spendings', SpendingController.getAllspendings);
routes.put('/spendings', SpendingController.update);
routes.delete('/spendings', SpendingController.deleteSpendingById);

module.exports = routes;

