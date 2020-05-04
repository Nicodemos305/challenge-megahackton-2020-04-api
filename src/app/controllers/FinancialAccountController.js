const { FinancialAccount, FinancialHistory } = require('../../database/index');
const Twilio = require('../../app/integrations/twilio');
const env = require('../../env/environments');

const twilio = env.SEND_TOKEN ? new Twilio() : null;

function sendInformationDeposit(phone, deposit) {
  if (env.SEND_TOKEN) {
    // send code confirmation - TWILIO
    twilio.sendInformationDeposit(phone, deposit);
  }
}

class FinancialAccountController {

       /**
        * creat - creat financiaAccount
        * 
        * @param {*} req
        * @param {*} res
        */
    async create(req, res) {
        req.body.phone = req.user.phone;
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
    * creat - creat financiaAccount
    * 
    * @param {*} req
    * @param {*} res
    */
    async depositFinancialAccount(req, res) {
        try {
                var financialAccount = {};
            var deposit = req.body.deposit;
            console.log(deposit);
            await FinancialAccount.read({"phone" : req.user.phone}).then(function (financiaAccount) {
                financialAccount = financiaAccount[0];
            });
            
            financialAccount.balance = financialAccount.balance + deposit;
            const financiaAccountUpdated = await FinancialAccount.update(financialAccount._id, financialAccount);
            
            try {
                sendInformationDeposit(req.user.phone, { deposit, date: new Date().toLocaleDateString() })
            } catch (error) {
                console.log(error);
            }

            if (financiaAccountUpdated) {
                
                financialAccount.balance = financialAccount.balance + deposit ;
                FinancialAccount.update(financialAccount._id, financialAccount);
                var historyObj = {"kind" : "Depósito", "value" : deposit, "phone" : req.user.phone, "balance" : financialAccount.balance};
                await FinancialHistory.create(historyObj);
            }
            return res.json({result: financiaAccountUpdated });
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Erro ao realizar o depósito'});
        }
    }

}
module.exports = new FinancialAccountController();