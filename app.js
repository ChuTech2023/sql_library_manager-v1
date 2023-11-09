var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const models = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//db sync
models.sequelize.sync()
.then(() => models.sequelize.authenticate())
.then(() => console.log("db connected"))
.catch( (err) => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error()
  err.status = 404
  err.message = "Page Not Found"
  res.render("page_not_found", {error:err})
  
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const error = {}
  error.status = err.status || 500
  error.message = err.message || "Internal Server Error";
  console.log(error.status, " - ", error.message)

  res.locals.message = error.message ;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render the error page
  res.status(error.status);
  res.render('error');
});

module.exports = app;
