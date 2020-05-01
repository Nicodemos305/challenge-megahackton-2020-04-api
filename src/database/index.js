const MongoDB = require('./MongoDB');
const LoginSchema = require('../app/models/Login');
const UserSchema = require('../app/models/User');
const GoalSchema = require('../app/models/Goal');
const SpendingSchema = require('../app/models/Spending');

const Login = new MongoDB(LoginSchema);
const User = new MongoDB(UserSchema);
const Goal = new MongoDB(GoalSchema);
const Spending = new MongoDB(SpendingSchema);
module.exports = {
  Login,
  User,
  Goal,
  Spending
};