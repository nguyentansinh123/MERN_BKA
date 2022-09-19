

const Room = require('../Models/ROOM')
const Hotel = require('../Models/HOTEL')

const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid

    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()

        try {
            await Hotel.findByIdAndUpdate(hotelId , {$push : {rooms:savedRoom._id}})
        } catch (error) {
            next(error)
        }

        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}


const updateRoom =  async (req,res)=>{
    const {id} = req.params
    try {
        const updatedRoom = await Room.findOneAndUpdate(id , {$set : req.body},{new:true})
        res.status(200).json(updatedRoom)
        
    } catch (error) {
        next(error)
    }
}

const getAllRoom =  async (req,res,next)=>{
    try {
       const allRoom = await Room.find({})      
       res.status(200).json({allRoom})
        
    } catch (error) {
        next(error)
    }
}

const getspecificRoom = async (req,res,next)=>{
    const {id} = req.params
    try {
       const room = await Room.findOne({id})      
       res.status(200).json({room})
        
    } catch (error) {
        next(error)
    }
}

const deleteRoom = async (req,res)=>{
    const {id} = req.params
    const hotelId = req.params.hotelid
    try {
        const deleteRoom = await Room.findOneAndDelete(id)
        try {
            await Hotel.findByIdAndUpdate(hotelId , {$pull : {rooms:req.params.id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(deleteRoom)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createRoom,
    updateRoom,
    getAllRoom,
    getspecificRoom,
    deleteRoom
}