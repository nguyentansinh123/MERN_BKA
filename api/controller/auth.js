const User = require('../Models/USER')
const createErr = require('../utils/error')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const register = async (req,res,next)=>{
    try {
        const newUser = await User.create({
            username: req.body.username,
            email : req.body.email,
            password: req.body.password,
        })
        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }
}
const login = async (req,res,next)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(createErr(404, "User doesnt exsist"))

        const isPassword = user.comparePassword(req.body.password)
        if(!isPassword){
            return next(createErr(500 , "Wrong password"))
        }
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET)
        res.cookie('access_token', token , {
            httpOnly: true,
        }).status(200).json({user})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}