const mongoose = require('mongoose')
const express = require('express')
const port = process.env.NODE_ENV || 3000
const router = require('./router/routes')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express({urlencoded: true})

app.use(bodyParser.urlencoded( {extended: true} ))
app.set('view engine', 'ejs')


app.listen(port, () => {
	console.log(`Server started on: ${port}`)
})

// router 
app.use(router)
