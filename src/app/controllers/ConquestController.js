const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { Goal, InvestmenUser } = require('../../database/index');

class ConquestController {

    async getAll(req, res) {
        try {
            var conquest = [];
            var goalsResult = [];
            var investmentsResult = [];
            conquest.push({"name" : "Parabéns! agora PigMoney vai te ajudar com suas finanças."});
            
            await Goal.read({"phone" : req.user.phone}).then(function (goals) {
                goalsResult = goals;
            
            });

            await InvestmenUser.read({"phone" : req.user.phone}).then(function (investment) {
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

   
            if(goalsResult.length > 0){
                conquest.push({"name" : "Você conseguiu poupar para seu primeiro objetivo."});
            }

            if(investmentsResult.length >= 6){
                conquest.push({"name" : "Você investiu seis vezes, seus hábitos estão mudando!"});
            }
            return res.json({result: conquest});
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao consultar Conquistas'});
        }
    }


}

module.exports = new ConquestController();