const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (error) {
        return next(error)
    }
});


userSchema.methods.comparePassword = async function(password){
    let isMatch = await bcrypt.compare(password , this.password)
    return isMatch
}
module.exports = mongoose.model('User', userSchema)