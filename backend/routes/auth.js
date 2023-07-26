// we can write this code (request and response) in index.js, but to maintain a better managemnt
// we are writing this code in this separate file

const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');     // this package is used for password hashing
const jwt = require('jsonwebtoken');    // this package is used for verification of the user
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'v%i*s@h#$a&l'

//   -------------------------------------------    Signup    --------------------------------------------------------

// ROUTE 1 : Creating a user using POST method : api/auth/createuser - No login required
router.post('/createuser',[
    body('name', 'Name must be of atleast 2 characters').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Name must be of atleast 5 characters').isLength({ min: 5 })
], async (req, res)=>{
    let success = false;
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    // check whether the user with this email already exists
    let user = await User.findOne({email: req.body.email});  // this is promise so we have to wait for its completion
    if(user){
        return res.status(400).json({success, error: "Sorry a user with this email already exists"})
    }

    // genSalt function generates salt which makes password hash, more strong.
    // it returns promises so we make it as await function
    const salt = await bcrypt.genSalt(10);
    // hash function is used to generate hash of passwords (with salt).
    // it returns promises so we make it as await function
    const securedPassword = await bcrypt.hash(req.body.password, salt);

    // user creation
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
    })
    
    // we can create user like this also
    // const user = User(req.body);
    // user.save()
    // res.send(req.body);

    // .then(user => res.json(user))
    // .catch(err=>{
    //    console.log(err),
    //    res.json({error : 'Please enter a unique value for email'})
    // })

    const data = {
        user : {
            id : user.id
        }
    }

    // authToken is a token returned to user (by sign method of jwt) after succesful login
    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(authToken);
    success = true;
    res.json({success, authToken})
    } catch (error) {
            // console.error(error.message);
            res.status(500).send("Internal Server Error");
    }
    
})

//   ------------------------------------------------------   Login   -------------------------------------------------

// ROUTE 2 : Authenticating a user using POST method : api/auth/login - No login required
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res)=>{
    let success = false;
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // destructuring of the data filled by user for login
    // email and password filled by the user will be stored in req.body
    const {email, password} = req.body;   
    try{
        // if a user with the same email as filled in for login exists then findOne method will return that
        // user credential otherwise it will return null
        let user = await User.findOne({email});             
        if(!user){
            return res.status(400).json({success, error:"Please login with correct credentials"});
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(400).json({success, error:"Please login with correct credentials"});
        }
    
        const data = {
            user : {
                id : user.id
            }
        }
    
        // authToken is a token returned to user (by sign method of jwt) after succesful login
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        success = true;
        res.json({success, authToken})
        } catch (error) {
                // console.error(error.message);
                res.status(500).send("Internal Server Error");
        }
})

//   --------------------------------------------   Fetch User Details   ----------------------------------------------

// ROUTE 3 : Get loggedIn user details using POST method : api/auth/getuser - Login required
router.post('/getuser', fetchuser, async (req, res)=>{
    
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Internal Server Error");
}
})

module.exports = router