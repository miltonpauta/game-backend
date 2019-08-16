const express = require('express')
const cors = require('cors')
const morgan = require('morgan'); 
const bodyParser = require('body-parser')

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());

app.use('/', ()=>{
    console.log('route hit')
})

//catch all errors that head to unexisting routes 
app.use((req, res, next)=>{
    const error = new Error('Route not found')
    error.status(404); 
    next(error)
})

//general error handler 
app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})


app.listen(3002, ()=>{
    console.log('Backend Server Running...Let the games begin')
})