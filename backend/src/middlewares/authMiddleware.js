const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req , res , next)=>{
console.log("authmiddleware working");

    const token = req.headear("Authorization");

    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }



    try {
        try {
            const jwtToken  = token.replace("Bearer" , "")
    
        const isVerified = jwt.verify(jwtToken . process.env.JWT_SECRET);
    
        const userData = User.findOne({email : isVerified.email}).select("-password");
    
        req.user  = userData;
        req.token = jwtToken;
        req.userId = userData._id;
        console.log("user data from authmiddleware" , userData);
        } catch (error) {
            return res.status(401).json({message:"Unauthorized"})
            console.log(error);
        }
        next()
    } catch (error) {
        next(error);
    }

}

module.exports = authMiddleware