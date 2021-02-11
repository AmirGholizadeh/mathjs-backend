const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'enter a title']
    },
    message:{
        type:String,
        required:[true, 'enter a message']
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    status:{
        type:String,
        enum:['open', 'closed'],
        default:'open'
    },
    from:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    replies:[{
        type:mongoose.Schema.ObjectId,
        ref:"Reply"
    }]
})

const Ticket = mongoose.model('Ticket',ticketSchema);

module.exports = Ticket;
