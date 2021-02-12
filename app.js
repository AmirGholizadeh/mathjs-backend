const express = require('express');
const helmet = require('helmet');

const userRouter = require('./routers/userRouter');
const ticketRouter = require('./routers/ticketRouter');
const replyRouter = require('./routers/replyRouter');

const errorController = require('./controllers/errorController');

const AppError = require('./utils/appError');

const app = express();

app.use(express.json({limit:'4kb'}));
app.use(express.urlencoded({extended:true}));
app.use(helmet());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tickets', ticketRouter);
app.use('/api/v1/replies', replyRouter);

app.use('*', (req,res,next) => next(new AppError('the endpoint is not found', 404)));

app.use(errorController);

module.exports = app;