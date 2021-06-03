const express = require ('express')
const bodyParser = require('body-parser')
const cors = require ('cors')


require('./models/user')


const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}))

// app.use('/comment', commentRoutes)
// app.use('/article', articleRoutes)

module.exports = app