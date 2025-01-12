const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        require: true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","user"],
    },
    resetPasswordToken:{
        type:String,
    },
    accessToken: {
        type: String,
    },
    refreshToken:{
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
})
module.exports = mongoose.model('User',userSchema);