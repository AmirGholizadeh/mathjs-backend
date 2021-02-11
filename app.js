const express = require('express');
const helmet = require('helmet');

const userRouter = require('./routers/userRouter');
const ticketRouter = require('./routers/ticketRouter');
const errorController = require('./controllers/errorController');

const app = express();

app.use(express.json({limit:'4kb'}));
app.use(express.urlencoded({extended:true}));
app.use(helmet());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tickets', ticketRouter);

app.use('*', (req,res,next) => {
    console.log('the page is not found!');
});

app.use(errorController);

module.exports = app;