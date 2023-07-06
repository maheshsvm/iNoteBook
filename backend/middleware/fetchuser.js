const jwt = require('jsonwebtoken')

const JWT_SECRET = "maheshisagoodboy@"
fetchuser = (req , res , next)=>{
    try {
        const token = req.header('auth-token')
        if(!token){
            res.status(401).json({error : "please authenticate with a correct token"})
        }
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user
        next()

    } catch (error) {
        res.status(401).json({error : "please authenticate with a correct token"})
    }
}
module.exports = fetchuser