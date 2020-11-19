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
router.get('/index/:id', async (req, res) => {

    let data = await db.findOne( {username: req.params.id } );
    if (data.expenses == '') {
        res.send({msg: 'You have no expenses to show'})
    } else {
        res.send(data.expenes)
    }

})

router.get('/addex', (req, res) => {
    res.render('addExpense')
})

// id is for the user.id
router.post('/addex', async (req, res, next) => {
    // verify data and add to user expense list
    let expenseData = {
        name: req.body.name,
        amount: req.body.cost, 
        description: req.body.description
    };

    let data = await db.findOne( {username: 'TheGreatKhan'} )
    data.expenses.push(expenseData)
    data.save()

    next(res.redirect('/'))
})

router.get('/del', (req, res) => {
    res.render('delete')
})

router.post('/del', async(req, res, next) => {
    // get item to be deleted from http
    
    db.expenes.findByIdAndDelete({_id: req.body.id})
    .then(() => {
        res.send('Deleted')
    })
    .catch(err => {
        if(err) {
            res.send('Something went wrong')
        }
    })
})


module.exports = router