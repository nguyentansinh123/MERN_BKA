const express = require('express')
const router = express.Router()
const createErr = require('../utils/error')
const {
    createHotel ,
    updateHotel,
    getAllHotel,
    deleteHotel,
    getspecificHotel,
    countByCity,
    countByType
}  = require('../controller/hotel')
const {verifyMiddleware,verifyUser,verifyAdmin} = require('../utils/verifyToken')


//C
router.post ('/',verifyAdmin,createHotel)

//r
router.patch ('/:id',verifyAdmin,updateHotel)

//Get all 
router.get ('/',getAllHotel)
router.get ('/countByCity',countByCity)
router.get ('/countByType',countByType)

router.get ('/:id',getspecificHotel)


//D
router.delete ('/:id',verifyAdmin,deleteHotel )

module.exports = router