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
exports.getmenu = function(req, res) {
  //console.log(key, req.query.menu_breakfast);
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

exports.userInfo = function(req, res) {
  var userId = req.query.userId;
  var newName = req.query.firstName;
  var newResName = req.query.restaurantName;
  var newPhoneNumber = req.query.phoneNumber;
  var newEmail = req.query.email;
  var NewCuisine = req.query.cuisine;

  console.log("Name to " + userId);
  // update database to newName
  var sql =
    "UPDATE owner SET name = ?, restaurant_name = ?, email = ?, phone = ?, cuisine = ?  WHERE id = ?";
  connection.query(
    sql,
    [newName, newResName, newEmail, newPhoneNumber, NewCuisine, userId],
    function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }
  );
};

exports.getOrders = function(req, res) {
  //console.log(key, req.query.menu_breakfast);
  connection.query("SELECT * FROM cart", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
};

exports.cancelOrders = function(req, res) {
  //console.log(key, req.query.menu_breakfast);
  connection.query("DELETE FROM cart", function(err, result, fields) {
    if (err) throw err;
    // console.log(result);
    // res.send(result);
  });
};
