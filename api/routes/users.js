const express = require('express')
const router = express.Router()
const {
    updateUser,
    getAllUser,
    deleteUser,
    getspecificUser
} = require('../controller/user')
const {verifyMiddleware,verifyUser,verifyAdmin} = require('../utils/verifyToken')


// router.get('/checkauth' , verifyMiddleware, (req,res)=>{
//     res.send('You are authenticated')
// })
// router.get('/checkuser/:id' , verifyUser, (req,res)=>{
//     res.send('You are in')
// })
// router.get('/checkAdmin/:id' , verifyAdmin, (req,res)=>{
//     res.send('You are in admin')
// })

//r
router.patch ('/:id',verifyUser,updateUser)

//Get all 
router.get ('/',verifyAdmin,getAllUser)

router.get ('/:id',verifyUser,getspecificUser)


//D
router.delete ('/:id',verifyUser, deleteUser)

module.exports = router