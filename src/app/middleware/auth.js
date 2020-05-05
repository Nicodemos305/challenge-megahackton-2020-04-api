const jwt = require('jsonwebtoken');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');
const { promisify } = require('util');
const authConfig = require('../../utils/authUtils');


module.exports = async (req, res, next) => {

  
  const authHeader = req.headers.authorization;
  console.log(req, authHeader);

  if (!authHeader) {
    const error  = { error: 'Token not provided' };
    console.error(error);
    return res.status(401).json(error);
  }

  console.debug('Token provided');

  const [, token] = authHeader.split(' ');

  try {

    console.log(token);

    const decode = await promisify(jwt.verify)(token, authConfig.secret);

    req.user = { 
      _id: decode._id, 
      phone: decode.phone 
    };

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