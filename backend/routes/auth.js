const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router();

// for creating user using post : "api/auth/createUser " NO login required
router.post('/createUser', [
    body('name', "Enter a valid name of min length 3").isLength({ min: 3 }),
    body('email', "Enter a valid email ").isEmail(),
    body('password', 'Enter a password of minimum of length 6').isLength({ min: 6 })
], async (req, res) => {

    // checking if there are validation errors then return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // creating user if it does not exists
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({ error: "sorry user already exists" });
        }

        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("some error occured")
    }
})

module.exports = router;