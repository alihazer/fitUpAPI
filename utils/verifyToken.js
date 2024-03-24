const jwt = require('jsonwebtoken');


const verifyToken = (token) =>{
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if (err) {
            return false;
        }
        return decoded
    })
    return user;
}

module.exports = verifyToken;