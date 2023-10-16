const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')


const registerUser= asyncHandler(async(req,res)=>{
    const {userName,email,password}=req.body
    console.log(userName)

    if(!userName|| !email|| !password){
        res.status(400)
        throw new Error('Pleas enter all isnfo')
    }
    const userExists=await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exsist')
    }
    //Hashing
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    //create user
    const user=await User.create({
        userName,email,password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            userName:user.userName,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('inbalid user DAta')
    }
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            userName:user.userName,
            email:user.email,
            token:generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error('inbalid credentials')
    }
    }
)
//private
const getMe=asyncHandler(async(req,res)=>{
    
   
    res.status(200).json(
        req.user
    )
})

//genete JWT
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports={
    registerUser,
    loginUser,
    getMe,
}