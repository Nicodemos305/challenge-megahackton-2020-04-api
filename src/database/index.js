const MongoDB = require('./MongoDB');
const LoginSchema = require('../app/models/Login');
const UserSchema = require('../app/models/User');
const GoalSchema = require('../app/models/Goal');

const Login = new MongoDB(LoginSchema);
const User = new MongoDB(UserSchema);
const Goal = new MongoDB(GoalSchema);
module.exports = {
  Login,
  User,
  Goal
};