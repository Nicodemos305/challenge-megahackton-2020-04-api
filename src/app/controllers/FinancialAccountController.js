const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authutils');
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

}
module.exports = new FinancialAccountController();