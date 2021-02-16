const Ticket = require('../models/ticketModel');
const Report = require('../models/reportsModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sortObj = require('../utils/sortObj');

exports.createATicket = catchAsync(async(req,res,next)=> {
    const {title, message} = req.body;
    const ticket = await Ticket.create({title, message, from:req.user._id});
    req.user.tickets.push(ticket);
    await req.user.save({validateBeforeSave:false});
    await Report.create({description:`ticket by id ${ticket._id} is created`, by:req.user._id});
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

exports.getTickets = catchAsync(async(req,res,next) => {
    const {page, sort} = req.query;
    const aggregation = [{$skip:10*page}, {$limit:10}];
    if(sort) aggregation.unshift({$sort:sortObj(sort)});
    const tickets = await Ticket.aggregate(aggregation)
    res.status(200).json({
        status:'ok',
        message:'tickets retrieved',
        results:tickets.length,
        data:{
            tickets,
        }
    })
});

exports.closeTicket = catchAsync(async(req,res,next) => {
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) return next(new AppError('no ticket is found by that id', 404));
    ticket.status = 'closed';
    await ticket.save({validateBeforeSave:false});
    await Report.create({description:`ticket by id ${ticket._id} is closed`, by:req.user._id});
    res.status(200).json({
        status:'ok',
        message:'ticket status changed',
        data:{
            ticket
        }
    })
});