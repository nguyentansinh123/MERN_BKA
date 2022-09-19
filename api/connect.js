const mongoose = require('mongoose')

const connectDB = (url) =>{
    console.log('connect database');
   return mongoose.connect(url)
}

module.exports = connectDB