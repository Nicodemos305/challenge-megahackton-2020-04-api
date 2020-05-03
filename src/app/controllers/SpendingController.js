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
        req.body.phone = req.user.phone;
        req.body.value = Number(req.body.value.replace(',', '.'));
        const spending = await Spending.create(req.body);
        return res.status(201).json({result: spending});
      }catch(err){
        console.log(err);
        return res.status(500).json({result: "error"});
      }
    }

    async update(req, res) {
      try{
        req.body.phone = req.user.phone;
        req.body.value = Number(req.body.value.replace(',', '.'));

        const update = await Spending.findById(req.body._id);

        const {name, kind, payday, value} = req.body;

        update.name = name;
        update.value = value;
        update.kind = kind;
        update.payday = payday;

        await update.save();
        return res.status(204).json();
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
<<<<<<< HEAD
            var spendings = await Spending.read({"phone" : req.user.phone}).then(function (spendings) {
                return res.json({result: spendings, total : spendings.length});
            });
            // console.log("Success :".concat(JSON.stringify(spendings)));
=======
              await Spending.read({"phone" : req.query.phone}).then(function (spendings) {
              return res.status(200).json({result: spendings, total : spendings.length});
            });
>>>>>>> 35745ad08fdbbf950c1b0803e8d466fe8012728f
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