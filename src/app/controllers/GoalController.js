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
          var goals = await Goal.read({"phone" : req.user.phone}).then(function (goals) {
              return res.json({result: goals, total : goals.length});
          });
          console.log("Success :".concat(JSON.stringify(goals)));
      }catch(err){
          console.log(err);
          return res.json({result: "error"});
      }
    }

        /**
     * Delete - delete goal 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async deleteGoalById(req, res) {
      const goal = await Goal.delete({"_id" : req.query._id });
      return res.json({result: goal});
    }
  }

  
  module.exports = new GoalController();
