const Report = require('../models/reportsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createAReport = catchAsync(async(req,res,next) => {
    const {description} = req.body;
    const report =await  Report.create({description, by:req.user._id});
    res.status(201).json({
        status:'ok',
        message:'the action is reported',
        data:{
            report
        }
    })    
});
