const jwt = require('jsonwebtoken');
const authConfig = require('../../utils/authUtils');
const Yup = require('yup');
const { Login } = require('../../database');


class SessionController {

  /**
   * Store - authenticate user 
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async store(req, res) {

    const schema = Yup.object().shape({
      phone: Yup.string().required().min(14).max(19),
      password: Yup.string().required().min(8).max(16),
    });
    
    delete req.body.createdUser;
    console.log(req.body);

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    console.log(String(req.body.phone).replace(/[\s\(\)\-]*/g, ''));

    const [ login ] = await Login.read({
      phone: String(req.body.phone).replace(/[\s\(\)\-]*/g, ''),
      confirmatedCodeAt: { $ne: null }
    });

    if (!login) {
      return res.status(404).json({ error: 'Login not found' });
    }
    
    return res.json({
      token: jwt.sign({ _id: login._id, phone: login.phone }, authConfig.secret, { expiresIn: authConfig.expiresIn }),
      createdUser: !!login.createdUserAt
    });
  }
  
}

module.exports = new SessionController();