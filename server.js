const express            = require('express');
const app                = express();
const cors               = require('cors');
const mongoose           = require('mongoose');
const bodyParser         = require('body-parser');
const projectRoutes      = require('./routes/Project');
const nodemailer         = require('nodemailer');
const path               = require("path");
const PORT               = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api/projects', projectRoutes);

mongoose.connect('mongodb://Bolub:Bioluwasefe1#@ds135207.mlab.com:35207/boluportfolio', { useNewUrlParser:true }, ()=> console.log("Database Connected"));

app.get('/', (req, res)=>{
    res.redirect('/api/projects');
})

app.post('/sendMail', (req, res)=>{
    const { name, email, subject, message} = req.body;

    async function main(){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'abiol5202@gmail.com',
            pass: 'Bioluwasefe123#'
          },
          tls: {
              rejectUnauthorized: false
          }
        });

        mailOptions = {
            from: email, 
            to: 'abiol5202@gmail.com', 
            subject: subject,
            text: message,  
        }
      
        await transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                res.status(400).json({'message': 'Message failed to send'});
            }else{
                res.status(200).json({'message': 'Message successfully sent'});
            }
        });
    }
      
    main();
});

app.listen(PORT, ()=> console.log('APP STARTED'));