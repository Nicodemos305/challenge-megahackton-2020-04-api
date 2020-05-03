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
      try{
        const goal = await Goal.create(req.body);
        return res.status(201).json({result: goal});
      }catch(err){
        console.log(err);
        return res.status(500).json({result: "error"});
      }
    }
    
    /**
     * GetAll - get goals
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getAllGoalsByUserPhone(req, res) {
      try{
<<<<<<< HEAD
          var goals = await Goal.read({"phone" : req.user.phone}).then(function (goals) {
              return res.json({result: goals, total : goals.length});
=======
          await Goal.read({"phone" : req.query.phone}).then(function (goals) {
              return res.status(200).json({result: goals, total : goals.length});
>>>>>>> 35745ad08fdbbf950c1b0803e8d466fe8012728f
          });
      }catch(err){
          console.log(err);
          return res.status(500).json({result: "error"});
      }
    }

        /**
     * Delete - delete goal 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async deleteGoalById(req, res) {
      try{
         await Goal.delete({"_id" : req.query._id });
         return res.status(200).json({});
      }catch(err){
        console.log(err);
        return res.status(500).json({result: "error"});
      }
    }
  }

  
  module.exports = new GoalController();
