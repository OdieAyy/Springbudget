const { resolveSrv } = require('dns')
const express = require('express')
const controller = require('../controller/controller')
const router = express.Router()
const bodyParser = require('body-parser')
const { createSecureServer } = require('http2')


router.get('/', (req, res) => {
    res.send('Home page')
})

router.get('/register', (req, res) => {
    //send register form
    res.render('register')
})

router.post('/register', (req, res, next) => {
    //receive register form, verify and add to DB, 
    let newUserData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.cpassword
    }
    try{
        createNewUser()
    } catch (err){
        res.redirect('/register')
        console.log(err)
    }
    next(res.redirect('/'))
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    //send data to Auth model and redirect to index
    let username = req.body.username
    let password = req.body.password

    console.log(`${username}, ${password}` )    
    next(res.redirect('/'))
})

router.get('/index', (req, res) => {
    let userData = await getUserData()
    let expenseData = await getExpenseData()

    res.render('index', {
        user: userData,
        expenses: expenseData
    })
})

router.get('/addex', (req, res) => {
    res.render('addExpense')
})

router.post('/addex', (req, res, next) => {
    // verify data and add to user expense list
    let expenseData = {
        name: req.body.name,
        cost: toString(req.body.cost), 
        description: req.body.description
    }
    await sendData({expenseData})
    next(res.redirect('/'))
})



module.exports = router