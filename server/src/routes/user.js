const router = require('express').Router()

const ctrlUsr = require ('../controllers/user')
const auth = require('../middleware/requireLogin')



router.route('/:id')    
    .get(auth, ctrlUsr.oneUser)
router.route('/follow')
    .put(auth, ctrlUsr.follow)
router.route('/unfollow')
    .put(auth, ctrlUsr.unfollow)
router.route('/updatepic')
    .put(auth, ctrlUsr.updatePict)


module.exports = router