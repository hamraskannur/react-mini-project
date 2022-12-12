const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = Schema({
    Name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model('user',userSchema)