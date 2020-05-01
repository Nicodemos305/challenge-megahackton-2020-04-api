const SEND_TOKEN = (process.env.SEND_TOKEN == 'true') || false;
const DEFAULT_TOKEN = "123456";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const PHONE_TWILIO = '+12183775978';
  

module.exports = {
  SEND_TOKEN,
  DEFAULT_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  PHONE_TWILIO
};