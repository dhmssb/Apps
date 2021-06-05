const Post = require ('../models/post')



exports.createPost = async (req,res) => {
    const {title, body, pic} = req.body

    if (!title || !body || !pic) return res.status(422).json({
        message: 'please add all the fields'
    })

    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo: pic,
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

exports.like = async (req, res) => {

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes: req.user._id}
    },{
        new: true
    }).exec((err, result) => {
        if(err){
            return res.status(422).json({error:err.message})
        }else{
            res.status(200).json(result)
        }
    })
}

exports.unlike = async (req, res) => {

    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes: req.user._id}
    },{
        new: true
    }).exec((err, result) => {
        if(err){
            return res.status(422).json({error:err.message})
        }else{
            res.status(200).json(result)
        }
    })
}