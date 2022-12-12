const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model('admin',adminSchema)