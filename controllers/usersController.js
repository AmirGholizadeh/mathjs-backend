const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')
const handlerFactory = require('./handlerFactory');

exports.getAllUsers = handlerFactory.getAll(User);
exports.getOneUser = handlerFactory.getOne(User);

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
    const {token} = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    user.topScore = topScore;
    user.save({validateBeforeSave:false});
    res.status(200).json({
        status:'ok',
        message:'user topscore is updated',
        data:{
            user
        }
    });
});
