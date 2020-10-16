const { resolveSrv } = require('dns')
const express = require('express')
const controller = require('../controller/controller')
const router = express.Router()
const model = require('../db/models/schema')

router.get('/', (req, res) => {


})

router.get('/two', (req, res) => {
    tests.secondTest()
    res.send('Also works')
})


module.exports = router