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
        req.body.phone = req.user.phone;
        req.body.value = Number(req.body.value.replace(',', '.'));
        const goal = await Goal.create(req.body);
        return res.status(201).json({result: goal});
      }catch(err){
        console.log(err);
        return res.status(500).json({result: "error"});
      }
    }

    async update(req, res) {
      try{
        req.body.phone = req.user.phone;
        req.body.value = Number(req.body.value.replace(',', '.'));

        const update = await Goal.findById(req.body._id);

        const {name, expectedDate, value} = req.body;

        update.name = name;
        update.value = value;
        update.expectedDate = expectedDate;

        await update.save();
        return res.status(204).json();
      }catch(err){
        console.log(err);
        return res.status(500).json({result: "error"});
      }
    }
    
    /**
     * GetAll - get goals
     * 
     * @param {*} res 
     */
    async getAllGoalsByUserPhone(req, res) {
      try{
          var goals = await Goal.read({"phone" : req.user.phone}).then(function (goals) {
              return res.json({result: goals, total : goals.length});
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
