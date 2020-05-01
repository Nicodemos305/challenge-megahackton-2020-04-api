const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { Goal } = require('../../database/index');

class GoalController {

    /**
     * Create - create goal 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async create(req, res) {
      const goal = await Goal.create(req.body);
      return res.json({result: goal});
    }
    
    /**
     * GetAll - get goals
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getAllGoalsByUserPhone(req, res) {
      try{
          var goals = await Goal.read({"phone" : req.query.phone}).then(function (goals) {
              return res.json({result: goals});
          });
          console.log("Success :".concat(JSON.stringify(goals)));
      }catch(err){
          console.log(err);
          return res.json({result: "error"});
      }
    }
  }

  
  module.exports = new GoalController();
