const Yup = require('yup');
const { Login } = require('../../database/index');
const Twilio = require('../../app/integrations/twilio');
const env = require('../../env/environments');

const twilio = env.SEND_TOKEN ? new Twilio() : null;

function createToken() {
  let token = null;
  if (env.SEND_TOKEN) {
    var randtoken = require('rand-token').generator({
      chars: '0-9',
    });
  
    token = randtoken.generate(6);
  }
  return token || env.DEFAULT_TOKEN;
}

function sendTokenCreateAccount(phone, token) {
  if (env.SEND_TOKEN) {
    // send code confirmation - TWILIO
    twilio.sendConfirmationAccount(phone, token);
  }
}

function getTwilio() {
  
}

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
      phone: Yup.string().required().min(19).max(19),
      password: Yup.string().required().min(8).max(16),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const body = req.body;
    body.phone = String(body.phone).replace(/[\s\(\)\-]*/g, '');

    const existUser = await Login.read({
      phone: req.body.phone
    });

    if (existUser && existUser.length > 0) {
      return res.status(400).json({ error: 'Login already registered' });
    }
    
    const token = createToken();
    body.code = token;
    const login = await Login.create(body);

    console.log(env);

    sendTokenCreateAccount(body.phone, token);    

    return res.json({ result: {
      name: login.name,
      phone: login.phone,
      insertedAt: login.insertedAt,
      updatedAt: login.updatedAt,
    } });

  }

  

  

  /**
   * Confirmation create account
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async confirmationLogin(req, res) {

    const schema = Yup.object().shape({
      phone: Yup.string().required().max(19),
      code: Yup.string().required().min(6).max(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const body = req.body;
    body.phone = String(body.phone).replace(/[\s\(\)\-]*/g, '');

    const [existUser] = await Login.read({
      phone: body.phone,
      code: body.code,
      confirmatedCodeAt: { $eq: null }
    });

    if (!existUser) {
      return res.status(404).json({ error: 'Login not found or invalid token.' });
    }

    existUser.confirmatedCodeAt = new Date();
    await existUser.save();

    res.json({ result: 'Confirmation account success'});
  }
  
}

module.exports = new LoginController();