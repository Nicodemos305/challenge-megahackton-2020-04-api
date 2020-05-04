const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, PHONE_TWILIO } = require('../../../env/environments');


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

class Twilio {

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
    
    const body = `PigMoney
    CONFIRMATION TOKEN: ${token}`;

    send(this.twilioClient, phone, body);

    return token;
  }

  /**
   *  Sendo information deposit
   * 
   * @param {*} phone 
   * @param {*} token 
   */
  sendInformationDeposit(phone, deposit) {
    
    const body = `PigMoney
    Foi depositado na data de ${deposit.date} um valor de: ${deposit.deposit}`;

    send(this.twilioClient, phone, body);
  }


}

module.exports = Twilio;