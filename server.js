const express = require('express')
const mongoose = require('mongoose')
const db = require('./db/database')
const router = require('./router/routes')
const port = process.env.NODE_ENV || 3000
const bodyParser = require('body-parser')
const model = require('./db/models/schema')
const { urlencoded } = require('express')
const ejs = require('ejs')

const app = express({urlencoded: true})

app.use(bodyParser.urlencoded( {extended: true} ))
app.set('view engine', 'ejs')


app.listen(port, () => {
	console.log(`Server started on: ${port}`)
})

// router 
app.use(router)
