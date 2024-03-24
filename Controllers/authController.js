const User = require('../Models/UserModel.js');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken.js');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signUp = asyncHandler(async(req, res)=>{
    const {name, email, password, weight, goal, age} = req.body;
    const user = await User.findOne({email});
    if (user) {
        return res.status(400).json({
            status: false,
            message: "Email already exists"
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({name, email, password: hashedPassword, weight, goal, age});
        const token = createToken(newUser._id);
        return res.status(201).json({
            status: true,
            message: 'User Created succesfully',
            token: token
        });
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
});

// @desc    Login to an existing user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async(req, res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            status: false,
            message: 'User Not Found'
        });
    }

    try {
        const isMatched = await bcrypt.compare(password, user.password);
        if(isMatched){
            const token = createToken(user._id);
            return res.status(200).json({
                status: true,
                message: 'Logged in succesfully',
                token: token
            });
        }
        else{
            return res.status(400).json({
                status: false,
                message: 'Wrong password'
            });
        }
    } catch (error) {
        throw Error(error);
    }
});

module.exports = {signUp, login};