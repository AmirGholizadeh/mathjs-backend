const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'a username must be provided'],
        unique:[true, 'this username is already taken']
    },
    password:{
        type:String,
        required:[true, 'a password must be provided'],
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true, 'passowrd must be confirmed'],
        validator:{
            validate:function(value){
                value !== this.password
            },
            message:'the passwords are not the same'
        }
    },
    role:{
        type:String,
        enum:['user', 'admin', 'manager'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    topScore:{
        type:Number,
        default:0
    },
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 13);
    this.passwordConfirm = undefined;
    next(); 
})

userSchema.methods.comparePassword = async(password,userPassword) => await bcrypt.compare(password, userPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;