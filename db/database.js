const { Console } = require('console');
const db = require('mongoose')

// DB connection 
try {
    db.connect('mongodb://localhost/spring')
    console.log('DB connection successful')
} catch (err) {
    console.log(
        `Check DB config file: ${err}` 
    )
};

module.exports = db


