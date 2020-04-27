module.exports = app => {
  const listGoalsController = require('../../controllers/goals/listGoalController')();
  const getGoalController = require('../../controllers/goals/getGoalController')();

  app.route('/api/v1/goals').get(listGoalsController.listGoals);
  app.route('/api/v1/goal').get(getGoalController.getGoal);

}