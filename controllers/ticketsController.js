const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.createATicket = catchAsync(async(req,res,next)=> {
    const {title, message} = req.body;
    const ticket = await Ticket.create({title, message, from:req.user._id});
    req.user.tickets.push(ticket);
    await req.user.save({validateBeforeSave:false});
    res.status(201).json({
        status:'ok',
        message:'ticket is sent',
        data:{
            user:req.user, 
            ticket,
            token:req.query.token
        }
    })
});