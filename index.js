const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const errorHandling = require('./middleware/errorHandling')
const mailchimp = require('./middleware/mailchimp')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 *  -> /subscribe 						-> subscribe single email to default list
 *  -> /subscribe/my-list				-> subscribe email to list with name 'my-list'
 *  -> /subscribe?list=my-list		-> subscribe email to list with name 'my-list'
 */

app.post('/subscribe/:list?', mailchimp.subscribe)

app.get('*', errorHandling.notFound)
app.use(errorHandling.general)

app.listen(port, () => {
	console.log(`Running on ${port}`)
})
