const express = require('express')
const router = express.Router();

router.get('/' , (req , res) =>{

    let obj = req.body;
    res.json(obj);
})

module.exports = router;