const express = require('express');
const {config} = require('dotenv');
const nodemailer = require('nodemailer');
const router = express.Router();

config();

router.post('/send_email', (req, res) => {
    const {name, email, message} = req.body;

    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.email,
                pass: process.env.app_password
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.email,
            subject: `Message from ${name}`,
            text: `
            Message sent from my porfolio: 

            ${message}

            Email: ${email}
        `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                res.status(401).send(err.message);
                return;
            }
            
            res.status(200).send('Message has been sent');
        })
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
})

module.exports = router;