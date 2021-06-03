require('dotenv').config()
const app = require ('./src/app')

const mongodbConnection = require ('./src/config/db')

const port = process.env.PORT
app.listen(port, () => {
    console.log(`app is running on ${port}`)
})