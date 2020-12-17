const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/spring2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connection open')
}).catch((err) => {
    console.log(`Unable to open connection: ${err}`)
});

// Models

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Password too short']
    },
    salary: {
        total: {
            type: String, 
            required: false,
            min: [0, 'Cannot be lower than 0']
        }    
    },
    expenses: [
        {   name: {
                type: String, 
                required: false
        },
            amount: {
                type: Number,
                required: false,
                min: [0, 'Total cannot be lower than 0']
            },
            description: {
                type: String, 
                required: false,
                default: '' // Empty string
            } 
    }]
});

const model = mongoose.model('model', UserSchema)

module.exports = model

//  let test = new model({
//      name: 'Brian',
//      sname: 'Spilner',
//      email: 'brianS@racersedge.com',
//      password: 1234,
//      salary: {
//          total: 14000
//      },
//      expenses: [{
//          name: 'Nitrous',
//          amount: 200
//      }, {
//          name: 'Pistons',
//          amount: 1400,
//          description: 'New Wiseco pistons for motor'
//      }]
//  }) 
//  
//  test.save().then( () => {
//      console.log('added')
//      mongoose.connection.close()
//  }).catch(err => {
//      console.log(err.message)
//      mongoose.connection.close()
//  })
//module.exports = mongoose.model('Data', UserSchema);