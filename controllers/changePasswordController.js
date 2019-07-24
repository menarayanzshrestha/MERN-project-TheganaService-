const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

//import validation schema 
const changePasswordSchema = require('../validators/userValidators/changePasswordSchema');

//import validator
const { validator }= require('../validators/index');

module.exports = async (req, res) => {

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
            _id
        } = req.params;

        const {
            password
        } = req.body;

        const userInfo = await User.find({ _id });

        console.log(userInfo,"here");

        if(userInfo.length === 0) {
            return res.status(409).json({
                message: "Auth failed.",
                log: "User not exist."
            })
        }

        var hash = bcrypt.hashSync(password, saltRounds);

        var UserPasswordChangeStatus = await User.updateOne(
            {
                _id : userInfo[0]._id
            },
            {
                $set: {
                    password : hash
                }
            }
        )

        if(UserPasswordChangeStatus.nModified === 0) {
            return res.status(500).json({
                message : "Internal Server Error",
                log: "Failed to update password"
            })
        }

        res.status(200).json({
            message : "Sucess",
            log: "Password has been changed successfully."
        })

    } catch (err) {

        console.log(err);
        res.status(500).json({
            message : err
        })
    }
}