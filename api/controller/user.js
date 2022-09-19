const User = require('../Models/USER')
const updateUser =  async (req,res)=>{
    const {id} = req.params
    try {
        const updatedUser = await User.findOneAndUpdate(id , {$set : req.body},{new:true})
        res.status(200).json(updatedUser)
        
    } catch (error) {
        next(error)
    }
}

const getAllUser =  async (req,res,next)=>{
    try {
       const allUser = await User.find({})      
       res.status(200).json({allUser})
        
    } catch (error) {
        next(error)
    }
}

const getspecificUser = async (req,res,next)=>{
    const {id} = req.params
    try {
       const User = await User.findOne({id})      
       res.status(200).json({User})
        
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req,res)=>{
    const {id} = req.params
    try {
        const deleteUser = await User.findOneAndDelete(id)
        res.status(200).json(deleteUser)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    updateUser,
    getAllUser,
    deleteUser,
    getspecificUser
}