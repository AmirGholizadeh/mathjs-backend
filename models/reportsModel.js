const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    description:{
        type:String,
        required:[true, 'a description is needed']        
    },
    by:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    at:{
        type:Date,
        default:new Date()
    },
})

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
