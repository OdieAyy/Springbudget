const { resolveSrv } = require('dns')
const express = require('express')
const controller = require('../controller/controller')
const router = express.Router()
const bodyParser = require('body-parser')


router.get('/', (req, res) => {
    res.send('Home page')
})

router.get('/register', (req, res) => {
    //send register form
    res.render('register')
})

router.post('/register', (req, res, next) => {
    //receive register form, verify and add to DB, 
    let username = req.body.username
    let email = req.body.email
    let password = req.body.cpassword
    console.log(`${username}, ${email}, ${password}`)
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
    res.send('index')
})

router.get('/addex', (req, res) => {
    res.send('addExpense')
})

router.post('addex/:data', (req, res) => {
    // verify data and add to user expense list
})



module.exports = router