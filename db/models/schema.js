const { Schema } = require('mongoose')
const db = require('../database')

const User = new Schema({
    username: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    MonthlyIncome: {
        type: Schema.Types.ObjectId,
        ref: 'MonthlyIncome'
    },
    expenses: [{
        type: Schema.Types.ObjectId, 
        ref: 'Expenses'
    }]
});

const MonthlyIncome = new Schema({
    type: {
        name: String,
        choices: ['Monthly', 'Weekly'],
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Expenses = new Schema({
    name: {
        type: String, 
        required: true,
    },
    frequency: {
        type: String,
        choices: ['Monthly', 'Weekly', 'Daily'],
        required: true
    }, 
    description: {
        type: String,
        required: false
    }
});

const UserModel = mongoose.model('user', User);
const MonthlyIncomeModel = mongoose.model('monthlyIncome', MonthlyIncome);
const ExpensesModel = mongoose.model('expenses', Expenses)

module.exports = { UserModel, MonthlyIncomeModel, ExpensesModel }
