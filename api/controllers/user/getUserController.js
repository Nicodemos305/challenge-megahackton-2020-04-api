module.exports = () => {
  const usersDB = require('../../data/userData.json');
  const controller = {};

  controller.getUser = (req, res) => res.status(200).json(usersDB);

  return controller;
}