const express =  require('express');
const bodyparser =  require('body-parser');
const mongoose =  require('mongoose');
var cors = require('cors');
var morgan = require('morgan');

//Routes
const routes = require('./routes/user');

var app = express();

mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-eutvo.mongodb.net:27017,cluster0-shard-00-01-eutvo.mongodb.net:27017,cluster0-shard-00-02-eutvo.mongodb.net:27017/theganaservices?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true}, (err) => {
    if(!err) { console.log("MongoDB connected sucessfully")}
    else{ console.log("Error in db connection", err)}
} );

mongoose.set('useCreateIndex', true); //avoid (node:2028) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.

mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(cors());

app.use(bodyparser.json());

// app.get('/', (req, res) => {
//     console.log("hello")
//     res.send("Hello World");
// })

app.use('/', routes);

app.use((req, res, next) =>{
    const error = new Error('404 Route not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
   res.status(error.status || 500);
   res.json({
        message : error.message
   });
   console.log(error.message);
});


module.exports = app;