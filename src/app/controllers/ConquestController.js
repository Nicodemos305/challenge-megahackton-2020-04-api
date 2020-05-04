const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { Goal, InvestmenUser } = require('../../database/index');

class ConquestController {

    async getAll(req, res) {
        var conquest = [];
        var goalsResult = [];
        var investmentsResult = [];
        var goalsReachable = [];
        conquest.push({"name" : "Parabéns! agora PigMoney vai te ajudar com suas finanças."});
        
        await Goal.read({"phone" : req.query.phone}).then(function (goals) {
            goalsResult = goals;
          
        });

        await InvestmenUser.read({"phone" : req.query.phone}).then(function (investment) {
            investmentsResult = investment;
          
        });

        if(goalsResult.length > 0 ){
            conquest.push({"name" : "Parabéns vc cadastrou seu primeiro objetivo!"});
        }

        if(investmentsResult.length > 0){
            conquest.push({"name" : "Meu primeiro investimento!"});
        }

        
        if(investmentsResult.length > 2){
            conquest.push({"name" : "Parabéns Poupador, investiu duas vezes."});
        }

        goalsResult.forEach(function(goalVO) { 
            if(goalVO && goalVO.value){
              if(goalVO.value < extract){
                goalsReachable.push(goalVO);
              }
  
            }
          });

        if(goalsReachable.length > 0){
            conquest.push({"name" : "Você conseguiu poupar para seu primeiro objetivo."});
        }

        if(investmentsResult.length >= 6){
            conquest.push({"name" : "Você investiu seis vezes, seus hábitos estão mudando!"});
        }
        return res.json({result: conquest});
    }


}

module.exports = new ConquestController();