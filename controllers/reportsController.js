const Report = require('../models/reportsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getReports = catchAsync(async(req,res,next) => {
    const reports = await Report.find({});
    res.status(200).json({
        status:'ok',
        message:"retrieved all reports",
        data:{reports}
    })
});
