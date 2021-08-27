require('dotenv').config()
const express= require('express')
const app = express()
const helmet = require('helmet')
const routes = require('./routes/user')
const cors = require('cors')
const errorHandling = require('./middlewares/errorHandler')

app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errorHandling)

module.exports = app