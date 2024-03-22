var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Blog = require("./Models/userSchema");
require("./routes/index")
const Profile = require("./Models/profileModel")
const session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// db connect
require("./Models/database");

// view engine setup
// app.set('views', "./ARTICULATE/views");
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../views/public')));


passport.use(new LocalStrategy({
  usernameField: "email", // Use the email field for authentication
  // You can add other options as needed
}, async (email, password, done) => {
  try {
      const user = await Profile.findOne({ email: email });
      if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
      }

      const isValidPassword = await user.authenticate(password);
      if (!isValidPassword) {
          return done(null, false, { message: "Incorrect email or password" });
      }

      return done(null, user);
  } catch (error) {
      return done(error);
  }
}));


app.use(
  session({
      resave: false,
      saveUninitialized: false,
      secret: "kshdfgiueswf",
      cookie: { maxAge: 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(Profile.serializeUser());
passport.deserializeUser(Profile.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send JSON response for errors
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

// Your code
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}
// Your code


module.exports = app;

