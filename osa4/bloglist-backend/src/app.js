const mongoose = require('mongoose')
const express = require('express')
const bloglistRouter = require('./controllers/bloglistRouter')
const userRouter = require('./controllers/userRouter')
const config = require('./utils/config')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', bloglistRouter)
app.use('/api/users', userRouter)

module.exports = app;
