const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./api')


const app = express()
const port = process.env.PORT || 5000
const public = path.join(process.cwd(), 'public')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(public))
app.use('/api', api)

app.get('*', (req, res) => {
	res.sendFile(path.join(public, 'index.html'))
})

app.listen(port, () => {
	console.log(`running on ${port}`)
})