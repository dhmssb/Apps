const User = require ('../models/user')
const Post = require ('../models/post')


exports.oneUser = async (req, res) =>{
    User.findOne({_id: req.params.id})

    .select('-password')
    .then(user=> {
        Post.find({postedBy:req.params.id})
        .populate('postedBy', '_id name')
        .exec((err, posts) =>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user, posts})
        })
    }).catch(err =>{
        return res.status(404).json({error:'User not found'})
    })
}

exports.follow = async (req,res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push:{followers: req.user._id}
    },{
        new:true
    },(err, result) =>{
        if(err) {
            return res.status(422).json({error: err.message})
        }
        User.findByIdAndUpdate(req.user._id, {
            $push :{following:req.body.followId}
        },{new:true})
        .select('-password')
        .then(result => {
            res.json(result)
        })
        .catch(err =>{
            return res.status(422).json({error: err.message})
        })
    })
}

exports.unfollow = async (req,res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull:{followers: req.user._id}
    },{
        new:true
    },(err, result) =>{
        if(err) {
            return res.status(422).json({error: err.message})
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull:{following:req.body.unfollowId}
        },{new:true})
        .select('-password')
        .then(result => {
            res.json(result)
        })
        .catch(err =>{
            return res.status(422).json({error: err.message})
        })
    })
}

exports.updatePict = (req, res) => {
    User.findByIdAndUpdate(req.user._id,{
        $set:{pic:req.body.pic}},{new: true},
        (err, result) => {
            if(err){
                return res.status(422).json({error:'Cant update pict'})
            }
            res.json(result)
    }
    )

}