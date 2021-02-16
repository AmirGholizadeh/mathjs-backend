const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = err => {
    console.error(err)
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};
const handleJWTError = () =>
    new AppError('token is modified or expired', 401);

const handleJWTExpiredError = () =>
    new AppError('Your token has expired', 401)

const sendError = (err, res) => {
    if(err.isOperational){
        if(process.env.NODE_ENV === 'production'){
            res.status(err.statusCode).json({
                status:err.status,
                message:err.message
            })
        }else{
            console.error(err);
            res.status(err.statusCode).json({
                status:err.status,
                message:err.message,
                stack:err.stack
            })
        }
    }else{
        if(process.env.NODE_ENV === "production"){
            res.status(500).json({
                status:"fail",
                message:'something went wrong'
            })
        }else{
            console.error(err);
            res.status(500).json({
                status:'fail',
                message:'something went wrong',
                stack:err.stack
            })
        }
    }
};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    let error = {...err };
    error.message = err.message;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
        error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendError(error, res);
}