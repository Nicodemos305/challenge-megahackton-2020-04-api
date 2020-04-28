const jwt = require('jsonwebtoken');
const authConfig = require('../../../utils/authUtils');

class SessionController {

  async store(req, res) {

    console.log(req.body);
    const { phone, password } = req.body;
    console.log(phone, password);

    return res.json({
      token: jwt.sign({ phone }, authConfig.secret, { expiresIn: authConfig.expiresIn })
    });
  }

}

module.exports = new SessionController();