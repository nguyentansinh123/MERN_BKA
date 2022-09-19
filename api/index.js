const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./connect')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const hotelRoute = require('./routes/hotels')
const roomRoute = require('./routes/rooms')
const cookieParser = require('cookie-parser')
const cors = require('cors')


app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/hotels', hotelRoute)
app.use('/api/v1/rooms', roomRoute)


app.use((err , req ,res ,next)=>{
    const errStatus = err.status || 500
    const errMsg = err.message || "something went wrong."
    return res.status(errStatus).json({success:false ,error:errMsg, stack: err.stack})
})


const port = process.env.PORT || 3000


const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(port,()=>{
            console.log(`app is listening on port ${port}`);
        })
    } catch (error) {
        throw error
    }
}
start()