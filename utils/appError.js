/**
 * @description custom error handler
 * @param {string} message the message for the error  
 * @param {number} statusCode the status code for the rror
 * @returns {object}
 */


class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;