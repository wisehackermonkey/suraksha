//suraksha server by wisehackermonkey
//business logic for interacting with sms users


const http = require('http');
const express = require('express');//used for recieving/sending sms messages 
const MessagingResponse = require('twilio').twiml.MessagingResponse;//sending sms messages
const bodyParser = require('body-parser');

const low = require('lowdb');//simple local json database
const FileSync = require('lowdb/adapters/FileSync');

//db setup
const adapter = new FileSync('db.json')
const db = low(adapter)



const PORT = 80
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/sms', (req, res) => {

    const twiml = new MessagingResponse();
    const phone = req.body.From
    const text_input = req.body.Body



    let page_text = get_page_text(phone)
    let current = current_page(phone);
    if(!db.get("users").find({phone:phone}).has("page_name").value()){
        db.get("users").find({phone:phone}).set("page_name","welcome").write()
    }

    let isUser = db.get("users").some(user => user.phone === phone).value()

    if(!isUser){
        console.log("successfull")
        db.get("users").push({phone:phone,page_name:"welcome"}).write()
        twiml.message("Adding phone number to database");
    }
        
    let num_links = db.get(`pages.${current}.links`).value().length
    

    if(!isNaN(text_input) && parseInt(text_input) < num_links && parseInt(text_input) >= 0 ){
    
        let page = db.get(`pages.${current}.links[${text_input}]`).value()
        if(page){
        db.get("users").find({ phone: req.body.From }).set("page_name",page).write()
        }
        console.log(db.get("users").find({ phone: req.body.From }).has("page_name").value())
        console.log(db.get("users").find({ phone: req.body.From }).value())
    }else{
        // twiml.message("Something went wrong...")
        console.log("fail")
    }
    
    
    twiml.message(page_text)

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

http.createServer(app).listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
 
const get_page_text = (phone_num) =>{
    let page_name = db.get("users")
                    .find({ phone: phone_num })
                    .get("page_name")
                    .value() 
    return  db.get(`pages.${page_name}.text`).value() 
}

const current_page = (phone_num) => {
    return db.get("users")
    .find({ phone: phone_num })
    .get("page_name")
    .value() 
}
const get_page_type = (phone_num) =>{
    let page_name = db.get("users")
                    .find({ phone: phone_num })
                    .get("page_name")
                    .value() 
    return  db.get(`pages.${page_name}.type`).value() 

}