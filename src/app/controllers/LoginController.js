const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { Login } = require('../../database/index');

class LoginController {

  /**
   * Create - create user 
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async create(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required().min(3),
      phone: Yup.string().required().min(11).max(11),
      password: Yup.string().required().min(8).max(16),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const existUser = await Login.read({
      phone: req.body.phone
    });

    if (existUser && existUser.length > 0) {
      return res.status(400).json({ error: 'Login already registered' });
    }

    const login = await Login.create(req.body);

    // send code confirmation - TWILIO

    return res.json({ result: {
      name: login.name,
      phone: login.phone,
      insertedAt: login.insertedAt,
      updatedAt: login.updatedAt,
    } });

  }
  
}

module.exports = new LoginController();