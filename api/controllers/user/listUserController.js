
module.exports = () => {
  const usersDB = require('../../data/usersData.json');
  const controller = {};

  controller.listUsers = (req, res) => res.status(200).json(usersDB);

  return controller;
}