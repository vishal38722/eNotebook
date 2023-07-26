// middleware - Its a function which will be called when roots with login required will be requested

// const { read } = require('fs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'v%i*s@h#$a&l'

// at the end of the fetchuser, next function will be called
const fetchuser = (req, res, next) => {             
    // Get the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }

    try {
        // data after verification from JWT
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();         // call for next function
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;