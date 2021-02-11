const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    message:{
        type:String,
        required:[true, 'enter a message']
    },
    from:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    ticket:{
        type:mongoose.Schema.ObjectId,
        ref:"Ticket"
    },
    createdAt:{
        type:Date,
        default:new Date()
    },  
})

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;