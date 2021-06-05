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
    .populate('comments.postedBy', '_id name')
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

exports.komen = async (req, res) => {

    const comment = {
        text:req.body.text,
        postedBy: req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments: comment}
    },{
        new: true
    })
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
        if(err){
            return res.status(422).json({error:err.message})
        }else{
            res.status(200).json(result)
        }
    })
}

exports.deletePost = async (req, res) => {
    Post.findOne({_id: req.params.postId})
    .populate('postedBy','_id')
    .exec((err, post) => {
        if(err || !post){
            return res.status(422).json({error : err.message})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.status(200).json({
                    message: 'Delete post success'
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
        }

    })
}

exports.getSub = async (req,res) =>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        })
    })
}