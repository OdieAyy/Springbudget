const mongoose = require('mongoose');
const Bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expenses.id'
    }]
});

//UserSchema.pre('save', function(next){
//    const hash = Bcrypt.hash(this.password, 9);
//    this.password = hash
//})

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
