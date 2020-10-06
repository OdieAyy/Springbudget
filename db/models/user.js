const mongoose = require('mongoose')

const User = mongoose.Schema ({
    username: String,
    email: String,
    salary: Number, 
    expenses: [{
        name: String,
        amount: Number,
        descript: String
    }]
});


module.exports = User