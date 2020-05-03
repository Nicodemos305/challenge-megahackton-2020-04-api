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
            await FinancialAccount.read({"phone" : req.query.phone}).then(function (financiaAccount) {
                return res.json({result: financiaAccount });
        });
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
     await FinancialAccount.delete({"_id" : req.query._id});
        return res.json({result: financialAccount});
    }

    /**
    * creat - creat financiaAccount
    * 
    * @param {*} req
    * @param {*} res
    */
    async depositFinancialAccount(req, res) {
        await FinancialAccount.read({"phone" : req.query.phone}).then(function (financiaAccount) {
            var deposit = req.body.deposit;
            var financialAccount = financiaAccount[0];
            financialAccount.balance = financialAccount.balance + deposit;
            const financiaAccountUpdated = FinancialAccount.update(financialAccount._id, financialAccount);
            return res.json({result: financiaAccountUpdated });});      
    }

}
module.exports = new FinancialAccountController();