const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { Goal, FinancialAccount, Spending } = require('../../database/index');

class GoalForecastController {
    
    /**
     * GetAll - get goals
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getGoalForecastByPhone(req, res) {
      var goalData = {};
      var financialAccountData = {};
      var spendingData = {};
      var extract = 0;
      var spendingTotalValue = 0;
      var goalsReachable = [];
      var goalsNotReachable = [];
      var spendingTotal = 0;
      try{
          await FinancialAccount.read({"phone" : req.user.phone}).then(function (financiaAccount) {
            financialAccountData = financiaAccount[0];
          });

          await Spending.read({"phone" : req.user.phone}).then(function (spendings) {
            spendingData = spendings;
          });
          
          
          spendingData.forEach(function(spending) { 
            if(spending && spending.value){
              spendingTotalValue = spendingTotalValue + spending.value;
            }
          });
          spendingTotal = spendingData.length;

          
          await Goal.read({"phone" : req.user.phone}).then(function (goals) {
            goalData = goals;
          });

          let balance = 0.00;
          if (financialAccountData && financialAccountData.balance) {
            balance = financialAccountData.balance;
            extract = balance - spendingTotalValue;
            goalData.forEach(function(goalVO) { 
              if(goalVO && goalVO.value){
                if(goalVO.value < extract){
                  goalsReachable.push(goalVO);
                }
    
                if(extract < goalVO.value){
                  goalsNotReachable.push(goalVO);
                }
              }
            });
          }

         var forecast = {"extract" : extract, "balance" : balance, "spendingTotalValue" : spendingTotalValue, "totalGoals" : goalData.length, "goalsReachable" : goalsReachable, "goalsNotReachable" : goalsNotReachable, "totalGoalsReachable" : goalsReachable.length, "totalGoalsNotReachable" : goalsNotReachable.length, "spendingTotal" : spendingTotal};
         
         console.log(spendingTotalValue);
         return res.status(200).json({result: forecast});
      }catch(err){
          console.log(err);
          return res.status(500).json({result: "error"});
      }
    }
  }
  
module.exports = new GoalForecastController();
