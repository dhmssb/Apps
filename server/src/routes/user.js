const router = require('express').Router()

const ctrlUsr = require ('../controllers/user')
const auth = require('../middleware/requireLogin')



router.route('/:id')    
    .get(auth, ctrlUsr.oneUser)


module.exports = router