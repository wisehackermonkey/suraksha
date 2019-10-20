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

    let current = db.get("users").find({ phone: phone }).get("page_name").value()
   
    let user_exists = db.get("users").some(user => user.phone === phone).value()

    let ispage = db.has(`pages.${current}.links[${text_input}]`).value()
    let isSelection = db.get(`pages.${current}.type`).value()

    if(ispage && isSelection == "select"){
        console.log("page exists and page type == select")
        console.log(`pages.${current}.links[${text_input}]`)
        let next_page = db.get(`pages.${current}.links[${text_input}]`).value()
        console.log(next_page)
        db.get("users").find({ phone: phone }).assign({ page_name: next_page, phone:phone}).write()
        twiml.message(get_page_text(phone))

    }else if(user_exists && isSelection == "input" && current == "description"){
        console.log("user exists and page  == description")
        let next_page = db.get(`pages.${current}.links[${text_input}]`).value()

        db.get("users").find({ phone: phone }).assign({intro:text_input}).write()
        console.log(db.get("users").find({ phone: phone }).value())

    }else if(user_exists && isSelection == "input" &&  current == "location"){
        console.log("user exists and page type == input and page ==location")
        console.log(text_input)
        let next_page = db.get(`pages.${current}.links[${text_input}]`).value()

        db.get("users").find({ phone: phone }).assign({location:text_input}).write()
        console.log(db.get("users").find({ phone: phone }).value())

        db.get("users").find({ phone: phone }).assign({ page_name: next_page, phone:phone}).write()
        twiml.message(get_page_text(phone))

    }else{
        console.log("page_name is not set")
        twiml.message("page_name is not set")
    }

    if(user_exists && isNaN(text_input)){
        console.log("user input is text")
        twiml.message(get_page_text(phone))
    }else{
        console.log("user does not exist")
    }

    if(!user_exists){
        console.log("create a new user")
        db.get('users')
        .push({
            "phone": phone,
            "page_name": "welcome",
            "location":"",
            "intro":"",
            "help":""
          })
        .write()
    
    
        twiml.message(db.get("pages.welcome.text").value() )

    }
    
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