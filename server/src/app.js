const express = require ('express')
const bodyParser = require('body-parser')
const cors = require ('cors')



const auth = require ('./routes/auth')



const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}))

app.use('/', auth)
// app.use('/article', articleRoutes)

module.exports = app