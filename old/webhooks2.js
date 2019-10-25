
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const PORT = 80
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  console.log(`Body:${req.body.Body}`)
  console.log(`From: ${req.body.From}`)
  if (req.body.Body.toLowerCase() == 'yes') {
      twiml.message("Please provide your location so we can personalize our services. Type the first 3 letters of your city. Eg. for Delhi, type DEL");
    // twiml.message('Select a option \n1)dogs \n2)cats \n3) griffins');
    console.log("Sent: Select a option \n1)dogs \n2)cats \n3) griffins");
  } else if (req.body.Body.toLowerCase() == 'no') {
    twiml.message('Goodbye');
    console.log("Sent: Goodbye");

  }else if(req.body.Body == "?") {
    twiml.message("Suraksha is a platform for 1 to\nconnect with one another and find\nservices that they need. Would\nyou like to access this platform. To\n join, text YES")
  }else {
      if(req.body.Body == '1'){
          twiml.message("Dogs are great!");
        }else if(req.body.Body == '2'){
            twiml.message("Cats are great!");
        }else if(req.body.Body == '3'){
            twiml.message("griffins really?");
        }else{
            twiml.message(`Welcome to Suraka. We are a\npeer-to-peer support network. For\nmore information type 'info'\nअलग भाषा के लिए, 2 दबाएँ`);
        }
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
