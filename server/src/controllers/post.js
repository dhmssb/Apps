const Post = require ('../models/post')



exports.createPost = async (req,res) => {
    const {title, body} = req.body

    if (!title || !body) return res.status(422).json({
        message: 'please add all the fields'
    })

    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result => {
        res.status(200).json({
            message: 'Post succes',
            post: result})
    })
    .catch(err=> {
        res.status(500).json({
            error: err.message})
    })

}

exports.getAll = async (req,res) =>{
    Post.find()
    .populate('postedBy', '_id name')
    .then(posts => {
        res.status(200).json({posts})
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        })
    })
}

exports.getMy = async (req, res) => {
    Post.find({
        postedBy: req.user._id
    })
    .populate('postedBy', '_id name')
    .then(mypost =>{
        res.status(200).json({mypost})
    })
    .catch(err =>{
        res.status(500).json({error:err.message})
    })
}