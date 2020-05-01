const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { User } = require('../../database/index');



class UserController {

  /**
   * Create - create user 
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async create(req, res) {
    const user = await User.create(req.body);
    return res.json({result: user});
  }
  
}

module.exports = new UserController();