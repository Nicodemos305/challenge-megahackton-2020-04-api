const MongoDB = require('./MongoDB');
const LoginSchema = require('../app/models/Login');
const UserSchema = require('../app/models/User');

const Login = new MongoDB(LoginSchema);
const User = new MongoDB(UserSchema);

module.exports = {
  Login,
  User
};