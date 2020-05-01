const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { FinancialAccount } = require('../../database/index');

class FinancialAccountController {


       /**
        * creat - creat financiaAccount
        * 
        * @param {*} req
        * @param {*} res
        */
    async create(req, res) {
        const financiaAccount = await FinancialAccount.create(req.body);
        return res.json({result: financiaAccount});
    }

    /**
     * GetAll - get financialAccounts
     * 
     *  @param {*} req
     *  @param {*} res
     */
    async getFinancialAccountsByUserPhone(req, res) {
        try{
            var financialAccounts = await FinancialAccount.read({"phone" : req.query.phone}).then(function (financiaAccount) {
                return res.json({result: financiaAccount });
        });
        console.log("success :".concat(JSON.stringify(financialAccounts)));
    }catch(err){
        console.log(err);
        return res.json({result: "error"});
    }
}

    /**
     * Delete - delete financialAccount
     * 
     * @param {*} req
     * @param {*} res
     */
    async deleteFinancialAccountById(req, res) {
        const financialAccount = await FinancialAccount.delete({"_id" : req.query._id});
        return res.json({result: financialAccount});
    }

    /**
    * creat - creat financiaAccount
    * 
    * @param {*} req
    * @param {*} res
    */
    async depositFinancialAccount(req, res) {

        var financialAccountDetail = await FinancialAccount.read({"phone" : req.query.phone}).then(function (financiaAccount) {
            console.log(JSON.stringify(financiaAccount));
            var deposit = req.body.deposit;
            var objeto = financiaAccount[0];
            objeto.balance = objeto.balance + deposit;
            console.log(JSON.stringify(financiaAccount));
            const financiaAccountUpdated = FinancialAccount.update(objeto._id, objeto);
            return res.json({result: financiaAccountUpdated });});
     
       
            console.log(JSON.stringify(financialAccountDetail));
    }

}
module.exports = new FinancialAccountController();