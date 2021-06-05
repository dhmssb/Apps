const express = require ('express')
const bodyParser = require('body-parser')
const cors = require ('cors')



const auth = require ('./routes/auth')
const post = require ('./routes/post')
const user = require ('./routes/user')


const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: '*'
}))

app.use('/', auth)
app.use('/post', post)
app.use('/user', user)

module.exports = app