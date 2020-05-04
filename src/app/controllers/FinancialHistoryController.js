const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { FinancialHistory } = require('../../database/index');

class FinancialHistoryController {

    async getFinancialHistorysByUserPhone(req, res) {
        try{
            await FinancialHistory.read({"phone" : req.user.phone}).then(function (financialHistory) {
                return res.json({result: financialHistory });
        });
    }catch(err){
        console.log(err);
        return res.json({result: "error"});
    }
    }

}
module.exports = new FinancialHistoryController();

