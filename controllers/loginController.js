const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const nodeMailer = require('nodemailer');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');

//import validation schema 
const loginSchema = require('../validators/userValidators/loginSchema');

//import validator
const { validator }= require('../validators/index');

module.exports = async(req, res) => {

    try {
        //Validation start
        const validationError = validator(req.body, loginSchema);

        if(validationError){
            return res.status(400).json({
                message: validationError
            })
        }
        //Validation end


        const {
            email,
            password
        } = req.body;

        const userInfo = await User.find({ email, verificationStatus:true });

        if(userInfo.length === 0) {
            return res.status(409).json({
                message: "Auth failed.",
                log: "User not exist or not verified yet."
            })
        }

        var comparision = bcrypt.compareSync(password, userInfo[0].password);

        if(!comparision) {
            return res.status(401).json({
                message : "Auth failed.",
                log : "Pwd incorrect."
            })
        }

        // var token = jwt.sign({
        //     _id : userInfo[0]._id,
        //     email : userInfo[0].email,
        //     role : userInfo[0].role,
        //   }, 'secret123', { expiresIn: '1h' });

        var OTP = Math.floor(100000 + Math.random() * 900000);

        var OTPexpiredAt = Date.now() + 300000;

        var OTPUpdateStatus = await User.updateOne(
            {
                _id : userInfo[0]._id
            },
            {
                $set: {
                    OTP,
                    OTPexpiredAt
                }
            }
        )

        if(OTPUpdateStatus.nModified === 0) {
            return res.status(500).json({
                message : "Internal Server Error",
                log: "Failed to update OTP"
            })
        }

        res.status(200).json({
            message : "Sucess",
            log: "OTP has been send to email."
        })

        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "narayanshresthaonweb@gmail.com",
                pass: "QWERTYqwerty@12345"
            }
        });
        
        let mailOptions = {
            from: '"www.narayanstha.com.np" <noreply@mail.com>', // sender address
            to: email, // list of receivers
            subject: 'New OTP | www.narayanstha.com.np', // Subject line
            text: "Message through www.narayanstha.com.np ", // plain text body
            html: `<h2>New OTP is ${OTP}</h2>`, // html body
        };
    
        transporter.sendMail(mailOptions, (res, error, info) => {
            if (error) {
                return console.log(error);
            }
        });

    }catch(err) {

        console.log(err);
        res.status(500).json({
            message: err
        })

    }

}