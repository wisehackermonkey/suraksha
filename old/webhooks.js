let CONFIG = require("../secrets.json")
const accountSid =  CONFIG.TWILIO_ACCOUNT_SID;
const authToken = CONFIG.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
         body: 'Pineapple on pizza? yes or no?',
         from: '+12106721558',
         statusCallback: 'https://6085d2f5.ngrok.io/sms',
         to: '+17074946135'
       })
      .then(message => console.log(message.sid));
