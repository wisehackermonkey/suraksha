// Twilio Credentials
let CONFIG = require("../secrets.json")
const accountSid =  CONFIG.TWILIO_ACCOUNT_SID;
const authToken = CONFIG.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

const http = require('http');
const express = require('express');
const PORT = 80;

const app = express();

app.get('/confirm', (req, res) => {
  const uniqueId = req.query.id;

  // Lookup constiable `uniqueId` in a database to find messageSid
  const messageSid = 'SM067aef12686342b3a7f936e8c12b5c60';

  // Send Feedback to Twilio
  client.accounts(accountSid)
    .messages(messageSid)
    .feedback
    .create({
      outcome: 'confirmed',
    })
    .then(() => {
      // Handle remaining request normally
      res.send('Thank you!');
      res.end();
    })
    .catch((err) => {
      res.status(500);
      res.send(err.toString());
    })
    .done();
});

http.createServer(app).listen(1337, () => {
  console.log(`Express server listening on port ${PORT}`);
});
