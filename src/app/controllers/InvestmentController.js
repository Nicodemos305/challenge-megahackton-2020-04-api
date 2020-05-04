const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { FinancialAccount, FinancialHistory, Investment, InvestmenUser } = require('../../database/index');

class InvestmentController {

    /**
     * create - create investment
     * 
     * @param {*} req 
     * @param {*} res 
     */

    async create(req, res) {
        try{
        const investment = await Investment.create(req.body);
        return res.json({result: investment});
        }catch(err){
            Console.log(err);
            return res.json({result: "error"});
        }

}

    
    /**
     * buy - creates the investment object 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async buy(req, res) {
        try{
            var investmentValue = req.body.value;
            var financialAccount = {};
            await FinancialAccount.read({"phone" : req.body.phone}).then(function (financiaAccountVo) {
                financialAccount = financiaAccountVo[0];
        });
        var isValidInvestment = (financialAccount.balance - investmentValue) > 0;

        if(isValidInvestment){
            financialAccount.balance = financialAccount.balance - investmentValue ;
            var investmentUser = {"phone" : req.body.phone, "idInvestment" : req.body.idInvestment, "value" : investmentValue};
            await InvestmenUser.create(investmentUser);
    
            FinancialAccount.update(financialAccount._id, financialAccount);
  
            var historyObj = {"kind" : "Investimento", "value" : investmentValue, "phone" : req.body.phone, "balance" : financialAccount.balance};
            await FinancialHistory.create(historyObj);
       
            return res.json({result: "você investiu"});
        } else{
            return res.json({result: "Saldo insuficiente"}); 
        }
        }catch(err){
            console.log(err);
            return res.status(500).json({result: err});
        }   
    }

    /**
     * sell - sell an investment
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async sell(req, res) {
        return res.json({result: "vendi"});



    }

    async getInvestmentsAllow(req, res) {
        try{
            await Investment.read().then(function (investment) {
                return res.status(200).json({result: investment, total : investment.length});
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({result: "error"});
        }
      }






}
module.exports = new InvestmentController();