const router = require('express').Router()
const ctrlAuth = require ('../controllers/auth')
const auth = require('../middleware/requireLogin')



router.route('/')
    .get(auth, ctrlAuth.home)

router.route('/signup')
    .post(ctrlAuth.signUp)
router.route('/signin')
    .post(ctrlAuth.signIn)


module.exports = router