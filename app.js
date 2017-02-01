var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),


	mongoose = require('mongoose'),
  restify = require('express-restify-mongoose');

	fileUpload = require('express-fileupload'),


	passport = require('passport'),
  session = require('express-session'),
  LocalStrategy = require('passport-local').Strategy,
  store = require('./session-store'),
  methodOverride = require('method-override'),
  restify = require('express-restify-mongoose');

var index = require('./routes/index');
	  // books = require('./routes/books'),
	  // admin = require('./routes/admin');

var User = require('./models/user');

var app = express();

var uri = process.env.MONGOLAB_URI || 'mongodb://lanzosuarez:bobotngacla1234@ds055802.mlab.com:55802/gates-books'
mongoose.connect(uri)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(methodOverride());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


//require('./session-store');
app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60
  },
  store: store,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
require('./passport-init');

app.use((req, res, next)=>{
  if(req.user){
    res.locals.u=true;
  }
  next();
});

// app.use('/admin', admin);
// app.use('/', index);
// app.use('/books', books);


// catch 404 and forward to error handler
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

module.exports = app;
