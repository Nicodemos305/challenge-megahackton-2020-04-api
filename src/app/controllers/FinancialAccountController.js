const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { FinancialAccount, FinancialHistory } = require('../../database/index');

class FinancialAccountController {

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
    * creat - creat financiaAccount
    * 
    * @param {*} req
    * @param {*} res
    */
    async depositFinancialAccount(req, res) {
        var financialAccount = {};
        var deposit = req.body.deposit;
        await FinancialAccount.read({"phone" : req.query.phone}).then(function (financiaAccount) {
        financialAccount = financiaAccount[0];
         });
         
         financialAccount.balance = financialAccount.balance + deposit;
         const financiaAccountUpdated = await FinancialAccount.update(financialAccount._id, financialAccount);

         if (financiaAccountUpdated) {
            financialAccount.balance = financialAccount.balance + deposit ;
            FinancialAccount.update(financialAccount._id, financialAccount);
            var historyObj = {"kind" : "credit", "value" : deposit, "phone" : req.query.phone, "balance" : financialAccount.balance};
            await FinancialHistory.create(historyObj);
         }
         return res.json({result: financiaAccountUpdated });
    }

}
module.exports = new FinancialAccountController();