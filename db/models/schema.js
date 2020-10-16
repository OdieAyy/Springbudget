const mongoose = require('mongoose')

const Expense =  mongoose.Schema({
    name: String, 
    amount: Number, 
    descript: String
});

const expense = mongoose.model('expense', Expense)

const User = mongoose.Schema ({
    username: String,
    email: String,
    salary: Number, 
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
});

const user = mongoose.model('user', User)

module.exports = { user: user, expense: expense }