const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')
const handlerFactory = require('./handlerFactory');

exports.getAllUsers = handlerFactory.getAll(User);
exports.getOneUser = handlerFactory.getOne(User);