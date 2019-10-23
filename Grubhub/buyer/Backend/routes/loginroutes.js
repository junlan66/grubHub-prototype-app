var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "127.0.0.1", //3306
  user: "root",
  password: "shirley123",
  database: "grubHub"
});
connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn" + err);
  }
});
var id = null; //mySQL auto generate unique ID starting from null
exports.register = function(req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var buyer = {
    name: req.body.name,
    id: id, //req.body.id,
    email: req.body.email,
    password: req.body.password,
    created: today,
    modified: today
  };
  connection.query("INSERT INTO buyer SET ?", buyer, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 401,
        failed: "error ocurred"
      });
    } else {
      console.log("The solution is: ", results);
      res.send({
        code: 200,
        success: "user registered sucessfully"
      });
    }
  });
};

exports.login = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("in login");
  connection.query("SELECT * FROM buyer WHERE email = ?", [email], function(
    error,
    results,
    fields
  ) {
    console.log("backedn received email is", email);
    if (error) {
      console.log("error ocurred", error);
      res.writeHead(401, {
        "Content-Type": "text/plain"
      });
      // res.send({
      //   code: 401,
      //   failed: "error ocurred"
      // });
      res.end("Fail login");
    } else {
      // console.log('The solution is: ', results);
      if (results.length > 0) {
        console.log(results[0].password);
        if (results[0].password == password) {
          // res.writeHead(222, {
          //   "Content-Type": "text/plain"
          // });
          var user = results[0];
          console.log("USER IN BACK");
          console.log(user);
          res.send({
            id: user.id,
            firstName: user.name,
            lastName: "",
            email: user.email
          });
          res.end("sucessfull login");
        } else {
          console.log("Email and password does not match");
          console.log("error ocurred", error);
          res.writeHead(401, {
            "Content-Type": "text/plain"
          });
          res.end("Fail login");
        }
      } else {
        console.log("Email does not exits");
        console.log("error ocurred", error);
        res.writeHead(401, {
          "Content-Type": "text/plain"
        });
        // res.send({
        //   code: 401,
        //   failed: "Email does not exits"
        // });
        res.end("Fail login");
      }
    }
  });
};

exports.userInfo = function(req, res) {
  var userId = req.query.userId;
  var newName = req.query.firstName;
  var newPhoneNumber = req.query.phoneNumber;
  var newEmail = req.query.email;

  console.log("Name to " + newName + newPhoneNumber + newEmail + userId);
  // update database to newName
  var sql = "UPDATE buyer SET name = ?, email = ?, phone = ? WHERE id = ?";
  connection.query(sql, [newName, newEmail, newPhoneNumber, userId], function(
    err,
    result
  ) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
};

exports.getmenu = function(req, res) {
  connection.query("SELECT * FROM menu_breakfast", function(
    err,
    result,
    fields
  ) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
};

exports.getLunchMenu = function(req, res) {
  //console.log(key, req.query.menu_breakfast);
  connection.query("SELECT * FROM menu_lunch", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
};

exports.cart = function(req, res) {
  var cart = {
    name: req.body.name,
    id: req.body.id, //req.body.id,
    quantity: req.body.quantity
  };
  console.log(cart);
  connection.query("INSERT INTO cart SET ?", cart, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 401,
        failed: "error ocurred"
      });
    } else {
      console.log("The solution is: ", results);
      res.send({
        code: 200,
        success: "cart add successful"
      });
    }
  });
};
