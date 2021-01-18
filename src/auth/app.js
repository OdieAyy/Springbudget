const bcrypt = require('bcrypt');

//HASH AND COMPARE FUNCTIONS

saltRounds = 9

async function genSalt(saltRounds, password){
    bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(password, salt, function(err, hash){
            if (err){
                return ''
            } else {
                return hash
            }
        })
    })
}
