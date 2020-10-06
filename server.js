const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./router/routes')
const db = require('./db/database')
const model = require('./db/models/user')
const port = process.env.NODE_ENV || 3000

app.listen(port, () => {
	console.log(`Sever started on: ${port}`)
})

// router 
app.use(router)

let userModel = mongoose.model('User', model)

let test = new userModel({
	username: 'Adrian', 
	email: 'adrian.v8@icloud.com', 
	salary: 8000, 
	expenses:[]
})

try {
	test.save()
} catch(err){
	console.log('You fucked up')
}
