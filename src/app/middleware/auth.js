const jwt = require('jsonwebtoken');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');
const { promisify } = require('util');
const authConfig = require('../../utils/authUtils');


module.exports = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error  = { error: 'Token not provided' };
    console.error(error);
    return res.status(401).json(error);
  }

  console.debug('Token provided');

  const [, token] = authHeader.split(' ');

  try {

    const decode = await promisify(jwt.verify)(token, authConfig.secret);

    req.iduser = decode.iduser;

    return next();

  } catch (error) {

    var message = 'Token invalid'
    if (error instanceof TokenExpiredError) {
      message = error.message;
    }
    console.error(error);
    return res.status(401).json({ error: message });
    
  }

}