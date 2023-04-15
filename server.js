const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');
const app = express();
const path = require('path')


//env config
dotenv.config();

//route import
const userRoutes = require('./routes/userRoutes')

//mongodb connection
connectDB();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/user', userRoutes);

//static files
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//port
const PORT = process.env.PORT || 8080
//listen
app.listen(PORT, ()=> {
    console.log(`server is running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan.white);
})