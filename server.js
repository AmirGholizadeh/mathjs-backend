require('dotenv').config({path:"./config.env"});
const mongoose = require('mongoose');
const app = require('./app');

const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT;

mongoose.connect(mongoUrl, {
    useFindAndModify:true,
    useUnifiedTopology:true,
    useNewUrlParser:true,
}, () => {
    console.info('connected to the database');
});

app.listen(port, () => {
    console.info(`connected to port ${port}`);
});
