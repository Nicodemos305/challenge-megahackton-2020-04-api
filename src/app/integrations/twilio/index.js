const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, PHONE_TWILIO } = require('../../../env/environments');

module.exports = class Twilio {

  constructor() {
    this.twilioClient = twilio(
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN
    );
  }

  /**
   *  Send token to confirmate account
   * 
   * @param {*} phone 
   * @param {*} token 
   */
  sendConfirmationAccount(phone, token) {
    
    const body = ` PigMoney
    CONFIRMATION TOKEN: ${token}`;

    send(this.twilioClient, phone, body);

    return token;
  }

}

/**
 * Send
 * 
 * @param {*} phone 
 * @param {*} body 
 */
function send(twilioClient, phone, body) {

  twilioClient.messages.create({
    from: PHONE_TWILIO,
    to: phone,
    body
  });

}