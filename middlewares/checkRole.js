exports.isAdmin = (req, res, next) => {
    var userData = req.userData;
    // console.log("ROLE Employer:", userData);
    if(userData.role == "admin"){
        next();
    }else{
        return res.status(401).json({
            message: "Auth failed."
        })
    }
}

exports.isUser = (req, res, next) => {
    var userData = req.userData;
    // console.log("ROLE Employer:", userData);
    if(userData.role == "user"){
        next();
    }else{
        return res.status(401).json({
            message: "Auth failed."
        })
    }
}