const express= require('express')
const bodyParser=require('body-parser')
const HttpError= require('./models/http-error')
const mealsRoutes= require('./routes/meals-route')
const usersRoutes=require('./routes/users-route')
const app=express()
const fs= require('fs')
const mongoose= require('mongoose')
const path = require('path')
require('dotenv').config()
const cors = require('cors');

// Allow requests from specific origins
const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000','https://peaceful-florentine-01e68f.netlify.app/'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

//middleware
app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, X-requested-With, Content-Type,Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST, PATCH,DELETE')
    next()
})
app.use('/api/meals',mealsRoutes)
app.use('/api/users',usersRoutes)

app.use((req,res,next)=>{
    const error= new HttpError('could not find this route',404)
    throw error
})
// error handling middleware, if former part trigger it , throw/next
app.use((error,req,res,next)=>{
    if(req.file){
        fs.unlink(req.file.path, (err)=>{
            console.log(err)
        })
    }
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message:error.message || 'an unknown error'})
})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4pj8ua1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(()=>{
    app.listen(process.env.PORT || 1414)
}).catch(err=>{
    console.log(err)
})
