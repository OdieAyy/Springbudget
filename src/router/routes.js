const express = require('express')
const router = express.Router()
const db = require('../db/config')
const bodyParser = require('body-parser')


// Presentation page contatins to register and login links, and brief of the application
router.get('/', (req, res) => {
    res.send('Home page') 
})

router.get('/register', (req, res) => {
    // send registration form 
    res.render('register')
})

// recieve registration data and create db entry
router.post('/register', async (req, res, next) => {
    //receive register form, verify and add to DB, 
    let registrationData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.cpassword //cpassword == 'confirmed password'
    }
    
    let register = new db(registrationData)
    await register.save()
    .then( data => {
        if (data) {
            res.send(data)
            res.sendStatus(200)
        }
    })
    .catch( error => {
        if (error) {
            res.send(`Please note: ${error.message}`)
        }
    });
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    // send data to Auth model and redirect to index
    // assign session cookie/tag?? - how?

    let username = req.body.username
    let password = req.body.password

    //create cookie or web token for auth


    console.log(`${username}, ${password}` )    
    next(res.redirect('/'))
})


// add user paramter for validation - querying manually does work

router.get('/account', async (req, res) => {
    let data = await db.findOne({username: 'TheGreatKhan'})
    res.render('account', {data: data})
})


router.get('/add', (req, res) => {
    res.render('addExpense')
})

// id is for the user.id
router.post('/add', async (req, res, next) => {
    // verify data and add to user expense list
    let expenseData = {
        name: req.body.name,
        amount: req.body.cost, 
        description: req.body.description
    };

    let data = await db.findOne( {username: 'TheGreatKhan'} )
    data.expenses.push(expenseData)
    data.save()

    next(res.redirect('/account'))
})

router.delete('/delete/:id', async(req, res, next) => {
    
    let {id} = req.params
    let deleted = await db.findOne({username: 'TheGreatKhan'})

    await deleted.expenses.remove({_id: id})
    await deleted.save()

    res.redirect('/account')
})

router.get('/account/edit/:id', (req, res) => {
    let {id} = req.params
    console.log(id)
    res.render('expenseEdit', {data: id})
})

router.post('/account/edit/:id', async(req, res, next) => {
    
    let {id} = req.params
    let _id = ObjectID(id)

    let expenseData = {
        name: req.body.name,
        amount: req.body.cost, 
        description: req.body.description
    };

    //let item = await db.findById(_id)
    //console.log(item)
    //let update = await db.findOneAndUpdate(id, expenseData, {runvalidators: true});
    //await update.save();

    next(res.redirect('/account'));
})


module.exports = router