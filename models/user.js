const mongoose  = require('mongoose');

var userSchema = new mongoose.Schema({
    
    _id : {
        type: mongoose.Schema.Types.ObjectId
    },
    email : {
        type: String,
        unique : true,
        required: "Email cannot be empty"
    }, 
    password : {
        type: String,
        required: "Password cannot be empty"
    }, 
    role : {
        type: String,
        required: "Role cannot be empty"
    }, 
    OTP : {
        type: String
    }, 
    OTPexpiredAt : {
        type: Date,
        default : Date.now() - 10000
    }, 
    createdAt: {
        type: Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);
