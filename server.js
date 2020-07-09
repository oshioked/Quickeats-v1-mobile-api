const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// importing various routes
const categoryRouter = require('./routes/category');
const homeRouter = require('./routes/home');
const mealsRouter = require('./routes/meals');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');


//initialize app
const app = express();


// MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES MIDDLEWARE
app.use('/categories', categoryRouter);
app.use('/home', homeRouter);
app.use('/meals', mealsRouter);
app.use('/api/user', authRouter);
app.use('/user', userRouter);


const {PORT = 5000} = process.env;

app.listen(PORT, ()=>{
  console.log(`server is listening in port ${PORT}`)
})

module.exports = app;