const router = require('express').Router()

const ctrlPost = require ('../controllers/post')
const auth = require('../middleware/requireLogin')




router.route('/')
    .post(auth, ctrlPost.createPost)
    .get(auth, ctrlPost.getAll)
router.route('/mypost')    
    .get(auth, ctrlPost.getMy)

module.exports = router