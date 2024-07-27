const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const authTokenGenerator = require('./authToken.util')
const tokenRenewer = (req, res) => {
    console.log(req.cookies.jwt)
    if (req.cookies?.jwt) {
        jwt.verify(req.cookies.jwt, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401).json({message: "Unauthorized access: invalid refresh token"})
            }else{
                res.status(200).json({token: authTokenGenerator()})
            }
        })
    }else{
        res.status(401).json({message: "Unauthorized access: refresh token absent"})
    }
}

module.exports = tokenRenewer