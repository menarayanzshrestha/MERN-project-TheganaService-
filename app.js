const express =  require('express');
const bodyparser =  require('body-parser');
const mongoose =  require('mongoose');
var cors = require('cors');
var morgan = require('morgan');

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

app.get('/', (req, res) => {
    console.log("hello")
    res.send("Hello World");
})


module.exports = app;