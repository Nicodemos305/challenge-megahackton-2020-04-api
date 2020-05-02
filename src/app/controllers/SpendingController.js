const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { Spending } = require('../../database/index');

class SpendingController {

        /**
     * Create - create spending 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async create(req, res) {
      try{
        const spending = await Spending.create(req.body);
        return res.status(201).json({result: spending});
      }catch(err){
        console.log(err);
        return res.status(500).json({result: "error"});
      }
    }
      
      /**
       * GetAll - get spendings
       * 
       * @param {*} req 
       * @param {*} res 
       */
      async getAllspendings(req, res) {
        try{
              await Spending.read({"phone" : req.query.phone}).then(function (spendings) {
              return res.status(200).json({result: spendings, total : spendings.length});
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({result: "error"});
        }
      }

    /**
     * Delete - delete spending 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async deleteSpendingById(req, res) {
      try{
        await Spending.delete({"_id" : req.query._id });
        return res.json({result: goal});
      }catch(err){
        console.log(err);
        return res.status(500).json({result: "error"});
      }
    }
}

module.exports = new SpendingController();