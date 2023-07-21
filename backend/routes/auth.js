const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();

const JWT_SECRET = "maheshisagoodboy@"
// ROUTE 1 :for creating user using post : "api/auth/createUser" NO login required
router.post('/createUser', [
    body('name', "Enter a valid name of min length 3").isLength({ min: 3 }),
    body('email', "Enter a valid email ").isEmail(),
    body('password', 'Enter a password of minimum of length 6').isLength({ min: 6 })
], async (req, res) => {
    let success = false;

    // checking if there are validation errors then return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success ,  errors: errors.array() });
    }

    // creating user if it does not exists
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({success , error: "sorry user already exists" });
        }
        
        // securing password by stroing hash
        const salt = bcrypt.genSaltSync(10);
        const securePassword = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email
        })
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data , JWT_SECRET);
        // console.log(authToken)
        // res.json(user);
        // now we will send authentication token to the user
        success = true;
        res.json({success , authToken})
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})


// ROUTE 2 : Authenticate a user with credentials : "api/auth/login" NO login required

router.post('/login' , [
    body('email', "Enter a valid email ").isEmail(),
    body('password', 'Enter a password of minimum of length 6').exists()
] , async (req ,res) =>{
    let success = false;
    const {email , password} = req.body;
    // checking if there are validation errors then return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success , errors: errors.array() });
    }

    try {
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({ success , error : "Try to login with correct credentials"})
        }

        let isPasswordCorrect = bcrypt.compareSync(password , user.password);
        if(!isPasswordCorrect){
            res.status(400).json({success , error : "Try to login with correct credentials"})
        }

        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data , JWT_SECRET);
        // now we will send authentication token to the user
        success = true;
        res.json({success , authToken})

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 3 : get loggedin user Details using POST "/api/auth/getUser". Login required
router.post('/getuser' , fetchuser , async (req , res) =>{
    let userid = req.user.id;
    let user = await User.findById(userid).select('-password');
    res.json(user)
})

module.exports = router;