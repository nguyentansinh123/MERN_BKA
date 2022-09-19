const Hotel = require('../Models/HOTEL')

const createHotel =  async (req,res)=>{
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}


const updateHotel =  async (req,res)=>{
    const {id} = req.params
    try {
        const updatedHotel = await Hotel.findOneAndUpdate(id , {$set : req.body},{new:true})
        res.status(200).json(updatedHotel)
        
    } catch (error) {
        next(error)
    }
}

const getAllHotel =  async (req,res,next)=>{
    const {min , max , ...others} = req.query

    try {
       const allHotel = await Hotel.find({...others , cheapestPrice: {$gt : min ||1 , $lt:max ||99999}}).limit(parseInt(req.query.limit))      
       res.status(200).json(allHotel)
        
    } catch (error) {
        next(error)
    }
}
const countByCity =  async (req,res,next)=>{
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
        
    } catch (error) {
        next(error)
    }
}
const countByType =  async (req,res,next)=>{
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ])
        
    } catch (error) {
        next(error)
    }
}

const getspecificHotel = async (req,res,next)=>{
    const {id} = req.params
    try {
       const hotel = await Hotel.findOne({id})      
       res.status(200).json({hotel})
        
    } catch (error) {
        next(error)
    }
}

const deleteHotel = async (req,res)=>{
    const {id} = req.params
    try {
        const deleteHotel = await Hotel.findOneAndDelete(id)
        res.status(200).json(deleteHotel)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createHotel ,
    updateHotel,
    getAllHotel,
    deleteHotel,
    getspecificHotel,
    countByCity,
    countByType
}