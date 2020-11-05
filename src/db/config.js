const Sequelize = require('sequelize');

const sequelize = new Sequelize('spring', 'adrian', 'jewels-4202', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
       await sequelize.authenticate()
        console.log('Connection successful')
    } catch (err) {
        console.log(`Connection failed" ${err}`)
    }
})();