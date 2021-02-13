const User = require('../models/userModel');
const Report = require('../models/reportsModel');
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
    await Report.create({description:`user ${user._id} is signed up`, by:user._id});
    signSendToken(user, res, 201, 'signed up');
});

exports.login = catchAsync(async(req,res,next) => {
    const {username, password} = req.body;
    if(!username || !password) return next(new AppError('enter password and username', 400));
    const user = await User.findOne({username}).select('+password');
    if(!user || !(await user.comparePassword(password, user.password))) return next(new AppError('username or password is incorrect!', 400));
    await Report.create({description:`user ${user._id} is logged in`, by:user._id});
    signSendToken(user, res, 200, 'logged in');
});

exports.restrict = allowed =>catchAsync(async(req,res,next) => {

    const {token} = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if(!user) return next(new AppError('user is not found', 400));
    if(allowed.includes(user.role)) return next();
    return next(new AppError('you are not authorized', 401))
});

exports.validateToken = catchAsync(async(req,res,next) => {
    const {token} =req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.status(200).json({
        status:'ok',
        message:'token verified',
        data:{
            user,
            token
        }
    })
});

exports.protect = catchAsync(async(req,res,next) => {
    const {token} = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if(!user) return next(new AppError('the user belonging to this token no longer exists', 400));
    req.user = user;
    res.locals.user = user;
    next();
});