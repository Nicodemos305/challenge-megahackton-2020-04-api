const { Router } = require('express');
const LoginController =  require('./app/controllers/LoginController');
const SessionController =  require('./app/controllers/SessionController');
const UserController =  require('./app/controllers/UserController');
const GoalController =  require('./app/controllers/GoalController');
const SpendingController =  require('./app/controllers/SpendingController');
const FinancialAccountController = require('./app/controllers/FinancialAccountController');
const GoalForecastController = require('./app/controllers/GoalForecastController');
const InvestmentController = require('./app/controllers/InvestmentController');
const FinancialHistoryController = require('./app/controllers/FinancialHistoryController');
const ConquestController = require('./app/controllers/ConquestController');

const authMiddleware = require('./app/middleware/auth');

const routes = new Router();

routes.put('/confirmation', LoginController.confirmationLogin);
routes.post('/registers', LoginController.create);
routes.post('/sessions', SessionController.store);
routes.post('/investment/buy', InvestmentController.buy);
routes.get('/investment/sell', InvestmentController.sell);
routes.get('/investments', InvestmentController.getInvestmentsAllow);
routes.post('/investments', InvestmentController.create);

routes.use(authMiddleware);

routes.post('/users', UserController.create);
routes.get('/users', UserController.getUserByPhone);

routes.post('/spendings', SpendingController.create);
routes.get('/spendings', SpendingController.getAllspendings);
routes.put('/spendings', SpendingController.update);
routes.delete('/spendings', SpendingController.deleteSpendingById);

routes.post('/goals', GoalController.create);
routes.put('/goals', GoalController.update);
routes.get('/goals', GoalController.getAllGoalsByUserPhone);
routes.delete('/goals', GoalController.deleteGoalById);

routes.get('/goalForecast', GoalForecastController.getGoalForecastByPhone);

routes.post('/financialAccount', FinancialAccountController.create);
routes.get('/financialHistory', FinancialHistoryController.getFinancialHistorysByUserPhone);

routes.put('/depositFinancialAccount', FinancialAccountController.depositFinancialAccount);

routes.get('/conquest', ConquestController.getAll);

module.exports = routes;

