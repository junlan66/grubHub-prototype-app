var express = require("express");
var app = express();
var port = process.env.PORT || 4000;

var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");
var MongoStore = require("connect-mongo")(session);

var configDB = require("./config/database.js");
mongoose.connect(configDB.url);
require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "anystringoftext",
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 2 * 24 * 60 * 60
    })
  })
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function(req, res, next) {
  console.log(req.session);
  console.log("===================");
  console.log(req.user);
  next();
});

app.set("view engine", "ejs");

// app.use('/', function(req, res){
// 	res.send('Our First Express program!');
// 	console.log(req.cookies);
// 	console.log('================');
// 	console.log(req.session);
// });

require("./app/routes.js")(app, passport);

app.listen(port);
console.log("Server running on port: " + port);
