var express = require("express");
var login = require("./routes/loginroutes");
var menuManagement = require("./routes/menuroutes");
var dataQuery = require("./routes/dataQuery");
var messages = require("./producer");
var messageRoute = require("./routes/messageroutes");
var bodyParser = require("body-parser");
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
//route
router.post("/restaurant/register", login.register);
router.post("/restaurant/login", login.login);
router.post("/restaurant/addBreakfast", menuManagement.addBreakfast);
router.post("/restaurant/deleteMenu", menuManagement.deleteMenu);
router.get("/restaurant/dataQuery/lunch", dataQuery.getLunchMenu);
router.get("/restaurant/dataQuery/breakfast", dataQuery.getmenu);
router.get("/restaurant/dataQuery/userInfo", dataQuery.userInfo);
router.get("/restaurant/dataQuery/orders", dataQuery.getOrders);
router.post("/restaurant/dataQuery/cancelOrder", dataQuery.cancelOrders);
router.get("/restaurant/messages/textbox", messages.textbox);
router.get("/restaurant/messages/getTextbox", messageRoute.getTextbox);
router.get("/restaurant/order/getOrder", messageRoute.getOrder);
app.use("/api", router);
app.listen(5000);
