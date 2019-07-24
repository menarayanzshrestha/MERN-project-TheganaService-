const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 
    try{

        const token = req.headers.authorization.split(" ")[1]; //accessing after bearer i.e bearer token
        const decoded = jwt.verify(token, "secret123");
        console.log(decoded);
        req.userData = decoded;
        next();

    }catch(error){
        return res.status(401).json({
            message : 'Auth failed',
            log: "Permission denied"
        });
        
    }
}
