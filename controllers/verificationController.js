const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

//import validation schema 
const changePasswordSchema = require('../validators/userValidators/changePasswordSchema');

//import validator
const { validator }= require('../validators/index');

module.exports = async(req, res) => {

    try {

        //Validation start
        const validationError = validator(req.body, changePasswordSchema);

        if(validationError){
            return res.status(400).json({
                message: validationError
            })
        }
        //Validation end

        const {
            verificationToken
        } = req.params;

        const {
            password
        } = req.body;

        const userInfo = await User.find({ verificationStatus: false, verificationToken });

        if(userInfo.length === 0) {
            return res.status(409).json({
                message: "Auth failed.",
                log: "Verification token donot match or Already verified."
            })
        } 

        var hash = bcrypt.hashSync(password, saltRounds);

        var UserVerificationStatusAndPassword = await User.updateOne(
            {
                _id : userInfo[0]._id
            },
            {
                $set: {
                    verificationStatus : true,
                    password : hash
                }
            }
        )

        if(UserVerificationStatusAndPassword.nModified === 0) {
            return res.status(500).json({
                message : "Internal Server Error",
                log: "Failed to update verification status or password"
            })
        }
        
        res.status(200).json({
            message : "Sucess",
            log: "Your account has been verified. Change your password for privacy concern."
        })

    }catch(err) {

        console.log(err);
        res.status(500).json({
            message: err
        })

    }

}