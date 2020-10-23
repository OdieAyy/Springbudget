const mongoose = require('mongoose')

const User = new mongoose.Schema({
    uname: String,
    email: String,
    salary: Number, 
    expenses: [{
        name: String,
        cost: Number,
        descipt: String
    }]
})

const user = mongoose.model('user', User)

module.exports = user