module.exports = () => {
  const goalsDB = require('../../data/goalsData.json');
  const controller = {};

  controller.listGoals= (req, res) => res.status(200).json(goalsDB);

  return controller;
}