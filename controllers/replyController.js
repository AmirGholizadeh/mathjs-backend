const Reply = require('../models/replyModel');
const Ticket = require('../models/ticketModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.sendAReply = catchAsync(async(req,res,next) => {
    
    const {id} = req.params;
    const {message} = req.body;
    
    const ticket = await Ticket.findById(id);
    if(ticket.status === 'closed') return next(new AppError('the ticket is closed', 401));
    
    const reply = await Reply.create({message, from: req.user._id, ticket:ticket._id});
    
    ticket.replies = [...ticket.replies, reply._id];
    await ticket.save({validateBeforeSave:false});
    
    res.status(201).json({
        status:'ok',
        message:'reply sent',
        data:{
            reply, 
            ticket
        }
    });
});