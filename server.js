const express = require('express')
const app = express()
const port = process.env.NODE_ENV || 3000

app.get('/', (req, res) => {
	res.send('Working correctly')
})

app.listen(port, () => {
	console.log(`Server listening on ${port}`)
})