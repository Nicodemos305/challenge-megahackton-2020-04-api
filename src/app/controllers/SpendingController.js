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
        const spending = await Spending.create(req.body);
        return res.json({result: spending});
      }
      
      /**
       * GetAll - get spendings
       * 
       * @param {*} req 
       * @param {*} res 
       */
      async getAllspendings(req, res) {
        try{
            var spendings = await Spending.read({"phone" : req.query.phone}).then(function (spendings) {
                return res.json({result: spendings});
            });
            console.log("Success :".concat(JSON.stringify(spendings)));
        }catch(err){
            console.log(err);
            return res.json({result: "error"});
        }
      }

              /**
     * Delete - delete spending 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async deleteSpendingById(req, res) {
      const goal = await Spending.delete({"_id" : req.query._id });
      return res.json({result: goal});
    }
    }

module.exports = new SpendingController();