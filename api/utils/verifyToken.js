const jwt = require('jsonwebtoken')
const createErr = require('./error')
require('dotenv').config()


const verifyMiddleware = (req , res ,next) =>{
    const token = req.cookies.access_token
    if(!token){
        return next(createErr(500, "You are not authenticated !"))
    }

    jwt.verify(token , process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(createErr(500, "Token is not valid !"))
        }

        req.user = user
        next()
    })
}

const verifyUser = (req,res,next)=>{
    verifyMiddleware(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createErr(500, "You are not authenticated !"))
        }
    })
}

const verifyAdmin= (req,res,next)=>{
    verifyMiddleware(req,res,next, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createErr(500, "You are not authenticated !"))
        }
    })
}



module.exports = {verifyMiddleware,verifyUser , verifyAdmin}