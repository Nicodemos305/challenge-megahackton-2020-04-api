/*
const accountSid = process.env.TWILIO_ACCOUNT_SID; // ACb1d44c1e2f53efa5330aa518dee52369
const authToken  = process.env.TWILIO_AUTH_TOKEN; // 7a528679faaa486cfe8532df51fd98cc
*/

const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

twilioClient.messages.create({
  from: '+12183775978',
  to: '+5561992386335',
  body: 'Você foi trouxa!!!'
});