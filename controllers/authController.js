const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const signToken =  id => 
     jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRESIN 
    });

const signSendToken = (user, res, statusCode, message) => {
    const token = signToken(user._id);
    user.password = undefined;
    res.status(statusCode).json({
        status:'ok',
        message,
        data:{
            token,
            user
        }
    })
};

exports.signup = catchAsync(async(req,res,next) => {
    const {username, password, passwordConfirm} = req.body;
    if(!username || !password ) return next(new AppError('enter password and username ', 400));
    const user = await User.create({username, password,passwordConfirm});
    signSendToken(user, res, 201, 'signed up');
});

exports.login = catchAsync(async(req,res,next) => {
    const {username, password} = req.body;
    if(!username || !password) return next(new AppError('enter password and username', 400));
    const user = await User.findOne({username}).select('+password');
    if(!user || !(await user.comparePassword(password, user.password))) return next(new AppError('username or password is incorrect!', 400));
    signSendToken(user, res, 200, 'logged in');
});

