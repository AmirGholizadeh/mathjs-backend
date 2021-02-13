const User = require('../models/userModel');
const Report = require('../models/reportsModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')
const handlerFactory = require('./handlerFactory');
exports.getAllUsers = handlerFactory.getAll(User);
exports.getOneUser = handlerFactory.getOne(User);

exports.createAdmin = catchAsync(async(req,res,next) => {
    const {username, password, passwordConfirm} = req.body;
    const user = await User.create({username,password,passwordConfirm, role:'admin'});
    await Report.create({description:`user ${user._id} is created as an admin.`, by:user._id });
    res.status(201).json({
        status:'ok',
        message:'admin created',
        data:{
            user
        }
    });
});

exports.getTopUsers = catchAsync(async(req,res,next) => {
    const users = await User.aggregate([{
        $skip:10 * req.params.page},
        {$limit:10},
        {$sort:{topScore:1}
    }]);
    res.status(200).json({
        results:users.length,
        data:{
            users
        }
    });
});

exports.editTopScore = catchAsync(async(req,res,next) => {
    const {topScore} = req.body;
    req.user.topScore = topScore;
    req.user.save({validateBeforeSave:false});
    await Report.create({description:`${req.user._id}'s topscore is changed from ${req.user.topScore} to ${topScore}`, by:req.user._id});
    res.status(200).json({
        status:'ok',
        message:'user topscore is updated',
        data:{
            user:req.user
        }
    });
});
