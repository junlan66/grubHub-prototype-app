var express = require("express");
var login = require("./routes/loginroutes");
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
  res.json({ message: "welcome" });
});
//route to handle user registration
router.post("/buyer/register", login.register);
router.post("/buyer/login", login.login);
router.post("/buyer/login/cart", login.cart);
router.get("/buyer/login/userInfo", login.userInfo);
router.get("/buyer/login/breakfast", login.getmenu);
router.get("/buyer/login/lunch", login.getLunchMenu);

app.use("/api", router);
app.listen(4000);
