const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    total: {
        type: Number,
        required: true 
    },
    description: {
        type: String, 
        required: false,
        default: 'No description given'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users.id'
    }
});

const Expenses = mongoose.model('Expenses', ExpenseSchema);

module.exports = Expenses;