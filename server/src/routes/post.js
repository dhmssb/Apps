const router = require('express').Router()

const ctrlPost = require ('../controllers/post')
const auth = require('../middleware/requireLogin')




router.route('/')
    .post(auth, ctrlPost.createPost)
    .get(auth, ctrlPost.getAll)
router.route('/mypost')    
    .get(auth, ctrlPost.getMy)
router.route('/like')
    .put(auth, ctrlPost.like)
router.route('/unlike')
    .put(auth, ctrlPost.unlike)
router.route('/comment')
    .put(auth, ctrlPost.komen)

module.exports = router