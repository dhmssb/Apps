const User = require ('../models/user')


exports.oneUser = async (req, res) =>{
    User.findOne({_id: req.params.id})

    .select('-password')
    .then(user=> {
        Post.find({postedBy:req.params.id})
        .populate('postedBy', '_id name')
        .exec((err, posts) =>{
            if(err){
                return res.status(422).json({error:err.message})
            }
            res.json({user,posts})
        })
    }).catch(err =>{
        return res.status(404).json({error:'User not found'})
    })
}