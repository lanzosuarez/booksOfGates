var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	fileUpload = require('express-fileupload'),
	passport = require('passport'),
  session = require('express-session'),
  LocalStrategy = require('passport-local').Strategy,
  store = require('./session-store');

var index = require('./routes/index'),
	  books = require('./routes/books'),
	  admin = require('./routes/admin');

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
 
require('./session-store');
app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60// 1 week 
  },
  store: store.s,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
require('./passport-init');


app.use((req, res, next)=>{
  if(req.user){
    res.locals.u = req.user.username;
  }
  next();
});

app.use('/', index);
app.use('/books', books);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
