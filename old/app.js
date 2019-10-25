// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
// require('dotenv').config();

let CONFIG = require("../secrets.json")
const accountSid =  CONFIG.TWILIO_ACCOUNT_SID;
const authToken = CONFIG.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
// SET  TWILIO_ACCOUNT_SID=AC7dc40a462f2b77c470bf05603bca1963
// SET  TWILIO_AUTH_TOKEN=aa83d2146b0e8f4f76eeb48cb6054f63
// SET  TWILIO_PHONE_NUMBER=+16504921877
client.messages
  .create({
     body: 'Hi this is oran from the server!',
     from: '+12106721558',
     to: '+17074946135'
   })
  .then(message => console.log(message.sid));

