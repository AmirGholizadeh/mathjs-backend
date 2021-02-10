const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(express.json({limit:'4kb'}));
app.use(express.urlencoded({extended:true}));
app.use(helmet());

app.all('*', (req,res,next) => {
    console.log('the page is not found!');
});

module.exports = app;