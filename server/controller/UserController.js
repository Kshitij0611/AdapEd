import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils//generateToken.js';
// @desc: Auth user/set token
// route: POST/api/users/auth
// @access: Public
const authUser=asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        const jwt=generateToken(res,user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            jwt:jwt,
            username: user.username,
        });
    } else {
        res.status(200).json({ message: "Invalid email or password" });
    }
})
// @desc: Register a new User
// Access: Public
// method: POST
const registerUser=asyncHandler(async(req,res)=>{
    const { name,email,password,gender,topics,collegeName,username } = req.body;
    console.log(req.body)
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(200).json({message: "User already exists"});
        // throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        gender,
        topics,
        collegeName,
        username
    });

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    
})
// @desc: Login User
// Access: Public
// method: POST
const loginUser=asyncHandler(async(req,res)=>{
    res.status(200).json({message:"User Logged In"})
})
// @desc: Logout user
// Access: Public
// method: GET
const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    });
    
    res.status(200).json({message:"User Logged Out"})
})
// @desc: Get User Profile
// Access: Public
// method: GET
const getUserProfile=asyncHandler(async(req,res)=>{
    // const {_id}=req.body;
    // console.log(req.user)
    const user=req.params.userId;
    console.log(req.params.userId)
    const Ouser=await User.findById(user);
    // console.log(Ouser)
     res.header("Access-Control-Allow-Origin", "*");
    // const user = {
    //     _id: req.user._id,
    //     name: req.user.name,
    //     email: req.user.email,
    //     username: req.user.username,
    //     collegeName: req.user.college,
    //     topics: req.user.topics
    // }
    res.status(200).json(Ouser)
})
// @desc: Update User Profile
// Access: Public
// method: PUT
const updateUserProfile=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    }else{
        res.status(404);
        throw new Error("User not found");
    }
})
export {authUser,registerUser,loginUser,logoutUser,getUserProfile,updateUserProfile };