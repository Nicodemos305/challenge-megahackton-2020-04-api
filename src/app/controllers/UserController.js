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
    try{
      await User.create(req.body);
      return res.status(201).json({result: user});
    }catch(err){
      console.log(err);
      return res.status(500).json({result: "error"});
    }

  }

  async getUserByPhone(req, res) {
    try{
        await User.read({"phone" : req.query.phone}).then(function (user) {
            return res.status(200).json({result: user});
          });
    }catch(err){
        console.log(err);
        return res.status(500).json({result: "error"});
    }
}
  
}

module.exports = new UserController();