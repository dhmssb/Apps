const User = require ('../models/user')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')



exports.home = async (req, res) => {
    res.status(200).json({
        message: 'WELCOME'
    })
}

exports.signUp = async (req,res) => {
    const {name, email,password} = req.body
     if(!email || !password || !name) {
       return res.status(422).json({
            message: 'please add all the fields'
        })
     }

    User.findOne({email: email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({
                message: 'User Already exist'
            })
        }

        bcrypt.hash(password, 8)
        .then(hashedpassword => {
            const user = new User ({
                email,
                password : hashedpassword,
                name
            })
            user.save()
            .then(user=>{
                res.status(200).json({
                    message: 'success signup',
                    data: user})
            })
            .catch(err=>{
                res.status(500).json({
                    message: err.message
                })
            })
            
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message
        })
    })

}

exports.signIn = async (req, res) => {
    const {email, password} = req.body
        if(!email || !password) return res.status(422).json({message: 'Please insert email or password'})
        
        User.findOne({email: email})
       .then(savedUser => {
            if(!savedUser) return res.status(422).json({message: 'Invalid email or password'})

            bcrypt.compare(password, savedUser.password)
            .then(doMatch =>{
                if(doMatch){
                    // res.status(200).json({
                    //     message: 'Succesfully login',
                    //     data: savedUser
                    // })
                    const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET)
                    res.status(200).json({
                        message:'Succesfully login',
                        token: token})

                }else{
                    res.status(422).json({message: 'Invalid email or password'})
                }
            })
            .catch(err =>{
                res.status(500).json({
                    message: err.message
                })
            })
       })
       .catch(err =>{
        res.status(500).json({
            message: err.message
        })
    })
       

}

