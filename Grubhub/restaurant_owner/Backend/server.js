//https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
var express = require("express");
var login = require("./routes/loginroutes");
var menuManagement = require("./routes/menuroutes");
var dataQuery = require("./routes/dataQuery");
var messages = require("./producer");
var messageRoute = require("./routes/messageroutes");
var bodyParser = require("body-parser");
//added
require("./passport");
var passport = require("passport");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
require("./passport");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var router = express.Router();
// test route
router.get("/", function(req, res) {
  res.json({ message: "welcome to our upload module apis" });
});
//added
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
});
//route
router.post("/restaurant/register", login.register);
router.post("/restaurant/login", login.login);
router.post("/restaurant/addBreakfast", menuManagement.addBreakfast);
router.post("/restaurant/deleteMenu", menuManagement.deleteMenu);
router.get("/restaurant/dataQuery/lunch", dataQuery.getLunchMenu);
router.get("/restaurant/dataQuery/breakfast", dataQuery.getmenu);
router.get("/restaurant/dataQuery/userInfo", dataQuery.userInfo);
router.post("/restaurant/dataQuery/cancelOrder", dataQuery.cancelOrders);
router.get("/restaurant/messages/textbox", messages.textbox);
router.get("/restaurant/messages/getTextbox", messageRoute.getTextbox);
router.get("/restaurant/messages/deleteOrder", messageRoute.deleteOrder);
router.get("/restaurant/order/getOrder", messageRoute.getOrder);
router.post("/restaurant/order/submitPastOrder", messageRoute.submitPastOrder);
app.use("/api", router);
app.listen(5000);
