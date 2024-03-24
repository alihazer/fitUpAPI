const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");


const isLoggedIn = (req, res, next)=>{
    const token = getTokenFromHeader(req);
    if(!token){
        return res.status(400).json({
            'status': false,
            'message': 'No token found please Login again'
        });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(400).json({
            'status': false,
            'message': 'Expired Token Please Login Again'
        });
    }
    req.userId = decoded.id;
    next();
}

module.exports = isLoggedIn;