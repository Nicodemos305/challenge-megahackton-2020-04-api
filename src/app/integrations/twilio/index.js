const twilio = require('twilio');

/**
 * Config keys TWILIO - API
 */
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 *  Send token to confirmate account
 * 
 * @param {*} phone 
 * @param {*} token 
 */
const sendConfirmationAccount = function(phone, token) {
  
  const body = ` PigMoney
  CONFIRMATION TOKEN: ${token}`;

  send(phone, body);

  return token;
};

/**
 * Send
 * 
 * @param {*} phone 
 * @param {*} body 
 */
function send(phone, body) {

  twilioClient.messages.create({
    from: '+12183775978',
    to: phone,
    body
  });
}

module.exports = {
  sendConfirmationAccount
}
