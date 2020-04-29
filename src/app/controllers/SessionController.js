const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { User } = require('../../database');

class SessionController {

  /**
   * Store - authenticate user 
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async store(req, res) {

    const schema = Yup.object().shape({
      phone: Yup.string().required().min(11).max(11),
      password: Yup.string().required().min(8).max(16),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    

    return res.json({
      token: jwt.sign({ phone }, authConfig.secret, { expiresIn: authConfig.expiresIn })
    });
  }
  
}

module.exports = new SessionController();