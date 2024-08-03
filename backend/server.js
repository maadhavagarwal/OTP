// require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-otp', (req, res) => {
    const { email, otp } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:"maadhavagarwal39@gmail.com",
            pass: "yyzm gngt ehtz momk"
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
