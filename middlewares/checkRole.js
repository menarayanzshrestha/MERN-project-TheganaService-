exports.isAdmin = (req, res, next) => {
    var userData = req.userData;
    // console.log("ROLE Employer:", userData);
    if(userData.role == "admin"){
        next();
    }else{
        return res.status(401).json({
            message: "Auth failed.",
            log : "Not a admin"
        })
    }
}

exports.isDeveloper = (req, res, next) => {
    var userData = req.userData;
    // console.log("ROLE Employer:", userData);
    if(userData.role == "developer"){
        next();
    }else{
        return res.status(401).json({
            message: "Auth failed."
        })
    }
}
exports.isManager = (req, res, next) => {
    var userData = req.userData;
    // console.log("ROLE Employer:", userData);
    if(userData.role == "manager"){
        next();
    }else{
        return res.status(401).json({
            message: "Auth failed."
        })
    }
}