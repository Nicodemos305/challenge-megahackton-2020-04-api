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

  async getUserByPhone(req, res) {
    try{
        var user = await User.read({"phone" : req.query.phone}).then(function (user) {
            return res.json({result: user});
          });
        console.log("Success :".concat(JSON.stringify(user)));
    }catch(err){
        console.log(err);
        return res.json({result: "error"});
    }
}
  
}

module.exports = new UserController();