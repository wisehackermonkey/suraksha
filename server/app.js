// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
require('dotenv').config();

const accountSid = 'AC7dc40a462f2b77c470bf05603bca1963';
const authToken = "API_KEY";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hi this is oran from the server!',
     from: '+12106721558',
     to: "+1XXX XXX XXXX"//'+17074946135'
   })
  .then(message => console.log(message.sid));
