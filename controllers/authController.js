const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const signToken =  id => 
     jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRESIN 
    });

const signSendToken = (user, res) => {
    const token = signToken(user._id);
    user.password = undefined;
    res.status(201).json({
        status:'ok',
        message:'signed up',
        data:{
            token,
            user
        }
    })
};

exports.signup = catchAsync(async(req,res,next) => {
    const {username, password, passwordConfirm} = req.body;
    const user = await User.create({username, password,passwordConfirm});
    signSendToken(user, res);
});
