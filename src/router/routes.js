const express = require('express')
const router = express.Router()
const User = require('../db/user');
const Expense = require('../db/expense');
const Bcrypt = require('bcrypt')

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
    //receive register form, verify and add to DB 
    let {email, inputPassword, confirmPassword} = req.body
    
    if (inputPassword === confirmPassword) {

        let emailInDb = await User.findOne({email: email});

        if (!emailInDb) {
            
            let hashed = await Bcrypt.hash(confirmPassword, 9);

            let user = new User({
                email: req.body.email, 
                password: hashed
            });
            
            await user.save()
            .then(() => {
                console.log('User registered');
                res.render('login');
            });
            
            return; 
        
        } else if (email === emailInDb.email) {
            
            res.render('register');
            console.log('Email already used');
            
            return;
        };

    } else {
        res.render('register');
        console.log('Passwords do not match');
    };

});    


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res, next) => {

    let {email, password} = req.body; 
    let checkIfExists = await User.findOne({email: email});

    if (!checkIfExists) {
        
        res.render('register');
        console.log('No user found - please register');

        return;

    } else if (email === checkIfExists.email) {
        if (await Bcrypt.compare(password, checkIfExists.password)) {
            res.redirect('/'); // create session before sending user to account
            console.log('logged in'); 
            
        } else {
            res.render('login');
            console.log('incorrect password');
        };
    };

});


// add user paramter for validation - querying manually does work

router.get('/account', async (req, res) => {
     
})


router.get('/add', (req, res) => {
    res.render('addExpense')
})

// id is for the user.id
router.post('/add', async (req, res, next) => {
    // verify data and add to user expense list
    let expenseData = {
        name: req.body.name,
        total: req.body.cost, 
        description: req.body.description
    };

    let user = await UserModel.findOne( {username: 'Adrian'} )
    expense = await new ExpenseModel(expenseData)
    await expense.user.push(user)
    await user.expenses.push(expense)
    await user.save()
    await expense.save()

    next(res.redirect('/account'))
})

router.delete('/delete/:id', async(req, res, next) => {
    
    let {id} = req.params
    let um = await UserModel.findOne({username: 'Adrian'})
    let em = await ExpenseModel.findOne({user: um._id})

    await um.expenses.remove({_id: id})
    await em.user.remove(um._id)
    await um.save()
    await em.save()

    res.redirect('/account')
})

router.get('/account', (req, res) => {
    res.render('account')
})

router.put('/account/:id', async(req, res, next) => {


    let {id} = req.params
    await db.findOneAndUpdate({name: 'TheGreatKhan'}, {expenses: {_id: id}}, {
        name: req.body.name,
        amount: req.body.amount,
        description: req.body.description
    })

    next(res.redirect('/account'));
})


module.exports = router