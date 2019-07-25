const User = require('../models/user');

module.exports = async (req, res) => {
    
    try {

        const {
            _id,
            role
        } = req.body;

        if( _id === req.userData._id ) {
            return res.status(409).json({
                message : "Auth failed",
                log : "User cannot change role of itself"
            })
        }

        const userInfo = await User.find({ _id });

        if(userInfo.length === 0) {
            return res.status(409).json({
                message : "Auth failed",
                log : "User not exist"
            })
        }
        
        var UserRoleChangeStatus = await User.updateOne(
            {
                _id : userInfo[0]._id
            },
            {
                $set: {
                    role
                }
            }
        )

        if(UserRoleChangeStatus.nModified === 0) {
            return res.status(500).json({
                message : "Internal Server Error",
                log: "Failed to update password"
            })
        }

        res.status(200).json({
            message : "Sucess",
            log: "User role has been changed successfully."
        })

    
    } catch (err) {

        console.log(err);
        res.status(500).json({
            message : err
        })
    }
}