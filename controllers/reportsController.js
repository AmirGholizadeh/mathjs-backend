const mongoose = require('mongoose');
const Report = require('../models/reportsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getReports = catchAsync(async(req,res,next) => {
    const {page, sort} = req.query;
    const aggregation = [{$skip:10*page}, {$limit:10}];
    if(sort) aggregation.unshift({$sort:{at:Number(sort)}});
    const reports = await Report.aggregate(aggregation);
    res.status(200).json({
        status:'ok',
        message:"retrieved all reports",
        data:{reports}
    })
});

exports.getIndividualReports = catchAsync(async(req,res,next) => {
    const reports = await Report.aggregate([
        {$match: {by:mongoose.Types.ObjectId(req.params.id)}},
        {$skip:10 * req.query.page},
        {$limit:10}
    ]);
    res.status(200).json({
        status:'ok',
        message:'retrieved all the individual`s reports',
        data:{
            reports
        }
    })
});
