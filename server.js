//Importing node libraries
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

//Express Object
var app = express();
//Configuring app Object
app.use(express.static(path.join(__dirname,"public")));
app.use(favicon(path.join(__dirname,'favicon.ico')));
//TODO remove dev logger for production. Create a logger for dev environment.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'Theg7',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/kmdb',
    autoReconnect: true
  })
}));

//Connect to MongoDb
mongoose.connect("mongodb://localhost:27017/kmdb");
mongoose.connection.on('error', function()
{
	console.log("Please connect to MongoDb server. There is MongoDb connection error.");
	process.exit(1);
});

//Home Page route
app.get('/', function(req,res){
	res.send('Hello World');
});

//Start server at port 3000
app.listen(3000);