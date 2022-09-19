const express = require('express')
const router = express.Router()
const {
    createRoom,
    updateRoom,
    getAllRoom,
    getspecificRoom,
    deleteRoom
} = require('../controller/room')
const {verifyMiddleware,verifyUser,verifyAdmin} = require('../utils/verifyToken')

//C
router.post ('/:hotelid',verifyAdmin,createRoom)

//r
router.patch ('/:id',verifyAdmin,updateRoom)

//Get all 
router.get ('/',getAllRoom)

router.get ('/:id',getspecificRoom)


//D
router.delete ('/:id/:hotelid',verifyAdmin,deleteRoom )



module.exports = router


