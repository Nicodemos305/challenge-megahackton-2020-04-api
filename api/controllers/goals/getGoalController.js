module.exports = () => {
  const goalDB = require('../../data/goalData.json');
  const controller = {};

  controller.getGoal = (req, res) => res.status(200).json(goalDB);

  return controller;
}