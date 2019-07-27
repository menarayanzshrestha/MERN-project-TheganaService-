const User = require('../models/user');

module.exports = async(req, res) => {

    try {

        const allUserInfo = await User.find({ });

        if(allUserInfo.length === 0) {
            return res.status(409).json({
                message: "No user"
            })
        } 

        res.status(200).json({
            message : "Sucess",
            data : allUserInfo
        })

    }catch(err) {

        console.log(err);
        res.status(500).json({
            message: err
        })

    }

}