const express = require('express');

var router = express.Router();

const mongoose = require('mongoose');

const Joi = require('@hapi/joi');

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

        const newUser = new User({
            _id,
            email,
            role ,
            OTP: _id,
            password : hash
        })

        const newUserStatus = await newUser.save();

        if(newUserStatus){
            res.status(200).json({
                message: "New User created successfully"
            })
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