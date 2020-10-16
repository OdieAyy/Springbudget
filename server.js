const express = require('express')
const mongoose = require('mongoose')
const db = require('./db/database')
const app = express()
const router = require('./router/routes')
const port = process.env.NODE_ENV || 3000

const model = require('./db/models/schema')

app.listen(port, () => {
	console.log(`Server started on: ${port}`)
})

// router 
app.use(router)
