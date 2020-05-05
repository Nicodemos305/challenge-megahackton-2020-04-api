const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { User, FinancialAccount, Login } = require('../../database/index');

class UserController {

  /**
   * Create - create user 
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async create(req, res) {
    try{
      req.body.phone = req.user.phone;
      req.body.salary = Number(req.body.salary.replace(',', '.'));
      var user = req.body;
      var financialAccount = { "phone" : req.user.phone, "balance" : 0 };
      await User.create(req.body);
      await FinancialAccount.create(financialAccount);
      const login = await Login.findById(req.user._id);
      login.createdUserAt = new Date();
      await login.save();
      return res.status(201).json({result: user});
    }catch(err){
      console.log(err);
      return res.status(500).json({result: "error"});
    }

  }

  async getUserByPhone(req, res) {
    try{
        await User.read({"phone" : req.user.phone}).then(function (user) {
        return res.status(200).json({result: user});
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({result: "error"});
    }
}
  
}

module.exports = new UserController();