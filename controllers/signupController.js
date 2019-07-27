const express = require('express');

const nodeMailer = require('nodemailer');
var randomstring = require("randomstring");

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');

//import validation schema 
const signupSchema = require('../validators/userValidators/signSchema');

//import validator
const { validator }= require('../validators/index');

module.exports = async(req, res) => {

    try {
        //Validation start
        const validationError = validator(req.body, signupSchema);

        if(validationError){
            return res.status(400).json({
                message: validationError
            })
        }
        //Validation end


        const {
            email,
            password,
            role
        } = req.body;

        const isUserExist = await User.find({ email });

        if(isUserExist.length > 0) {
            return res.status(409).json({
                message: "Email already existed"
            })
        }

        var hash = bcrypt.hashSync(password, saltRounds);

        var _id = new mongoose.Types.ObjectId;

        var tempToken = randomstring.generate(5) + _id + randomstring.generate(3);
        var tempToken2 = randomstring.generate(3) + _id + randomstring.generate(5);
        var verificationToken = tempToken2 + tempToken;

        const newUser = new User({
            _id,
            email,
            role ,
            OTP: _id,
            password : hash,
            verificationToken
        })

        const newUserStatus = await newUser.save();

        if(newUserStatus){
            res.status(200).json({
                message: "New User created successfully"
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
                subject: 'Verification Link | www.narayanstha.com.np', // Subject line
                text: "Message through www.narayanstha.com.np ", // plain text body
                html: `<h2><a href="localhost:3000/verification/${verificationToken}">Click here</a> for the verification : localhost:8080/verification/${verificationToken}</h2>`, // html body
            };
        
            transporter.sendMail(mailOptions, (res, error, info) => {
                if (error) {
                    return console.log(error);
                }
            });
            
        }else {
            res.status(409).json({
                message: "Failed to create new user."
            })
        }

    }catch(err) {

        console.log(err);
        res.status(500).json({
            message: err
        })

    }

}