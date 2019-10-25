//suraksha server by wisehackermonkey
//20191024 
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

let PORT =  process.env.PORT || 8080
const app = express();

console.log("Suraksha Server started:\n\n")
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', (req, res) => {

    const twiml = new MessagingResponse();
    const phone = req.body.From
    const text_input = req.body.Body



    let page_text = get_page_text(phone)

   
    let user_exists = db.get("users").some(user => user.phone === phone).value()
    if(user_exists){
        let current = db.get("users").find({ phone: phone }).get("page_name").value()
        console.log("user exists set current = " +current)
        console.log(db.get("users").find({ phone: phone }).value())
    
        let ispage = db.has(`pages.${current}.links[${text_input}]`).value()
        let isSelection = db.get(`pages.${current}.type`).value()

        console.log(current)
        if(ispage && isSelection == "select"){
            console.log("page exists and page type == select")
            console.log(`pages.${current}.links[${text_input}]`)
            let next_page = db.get(`pages.${current}.links[${text_input}]`).value()
            console.log(next_page)
            db.get("users").find({ phone: phone }).assign({ page_name: next_page, phone:phone}).write()
            twiml.message(get_page_text(phone))

            if(current == "sent"){
                twiml.message("Your request has been accepted by a Suraksha fellow! Please contact the following number to get in touch with her: 707-494-6134")

            }
        }
        else if(user_exists && isSelection == "input" && current == "description"){
            console.log("user exists and page  == description")

            db.get("users").find({ phone: phone }).assign({intro:text_input}).write()
            console.log(db.get("users").find({ phone: phone }).value())
            twiml.message(get_page_text(phone))
            db.get("users").find({ phone: phone }).assign({ page_name: "sent", phone:phone}).write()

        }else if(user_exists && isSelection == "input" &&  current == "location"){
            console.log("user exists and page type == input and page ==location")
            console.log(text_input)

            db.get("users").find({ phone: phone }).assign({location:text_input}).write()
            console.log(db.get("users").find({ phone: phone }).value())

            twiml.message(get_page_text(phone))

            db.get("users").find({ phone: phone }).assign({ page_name: "description", phone:phone}).write()
            

        }else{
            console.log("page_name is not set")
            twiml.message("Thanks! Your request has been sent. We'll send you an update once someone responds to your request.")
            twiml.message("Your request has been accepted by a Suraksha fellow! Please contact the following number to get in touch with her: 707-494-6134")

        }

    }else{
        let current = ""
    }
    if(user_exists && isNaN(text_input)){
        console.log("user input is text")
        // twiml.message(get_page_text(phone))
    }else{
        console.log("user does not exist")
    }

    if(!user_exists){
        twiml.message("creating a new user")
        console.log("create a new user")
        db.get('users')
        .push({
            "phone": phone,
            "page_name": "welcome",
            "location":"",
            "intro":""
          })
        .write()
    
    
        twiml.message(db.get("pages.welcome.text").value() )

    }
    
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

http.createServer(app).listen(PORT, () => {
    console.log(`Suraksha server listening on port ${PORT}`);
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