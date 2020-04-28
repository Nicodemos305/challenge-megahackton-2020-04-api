module.exports = () => {
  const mongoose = require('mongoose');
  const User = mongoose.model('User');
  const controller = {};
  var result = User.find().exec(function(err, data) {
    result = data;
  });
  controller.listUsers = (req, res) => res.status(200).json(result);
  return controller;
}