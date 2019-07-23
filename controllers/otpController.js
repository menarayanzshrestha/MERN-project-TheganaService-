const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = async(req, res) => {

    try {
        const {
            email,
            OTP
        } = req.body;

        const userInfo = await User.find(
            { 
                OTP, 
                email, 
                OTPexpiredAt : {
                    $gt: Date.now()
                } 
            }
        );

        console.log(userInfo,"here iser infor")

        if(userInfo.length === 0) {
            return res.status(409).json({
                message: "Your OTP has been expired or invalid."
            })
        }

        var OTPExpiredStatus = await User.updateOne(
            {
                _id : userInfo[0]._id
            },
            {
                $set: {
                    OTPexpiredAt : Date.now() - 600000
                }
            }
        )

        if(OTPExpiredStatus.nModified === 0) {
            return res.status(500).json({
                message : "Internal Server Error",
                log: "Failed to expire OTP"
            })
        } 

        var token = jwt.sign(
            {
                _id : userInfo[0]._id,
                email : userInfo[0].email,
                role : userInfo[0].role,
            }, 
            'secret123',
            {
                expiresIn: '1h' 
            }
        );

        res.status(200).json({
            message : "Sucess",
            token 
        })



    } catch (err) {

        console.log(err);
        res.status(500).json({
            message: err
        })

    }
}