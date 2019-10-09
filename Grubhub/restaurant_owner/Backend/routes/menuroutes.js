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
exports.addBreakfast = function(req, res) {
  var today = new Date();
  var menu = {
    name: req.body.name,
    id: id,
    description: req.body.description,
    price: req.body.price,
    created: today
  };
  console.log("type is", req.body.menutype);
  if (req.body.menutype == "breakfast") {
    connection.query("INSERT INTO menu_breakfast SET ?", menu, function(
      error,
      results,
      fields
    ) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 233,
          failed: "error ocurred"
        });
      } else {
        console.log("The solution is: ", results);
        res.send({
          code: 200,
          success: "breakfast menu add sucessfully"
        });
      }
    });
  } else if (req.body.menutype == "lunch") {
    connection.query("INSERT INTO menu_lunch SET ?", menu, function(
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
          success: "lunch menu add sucessfully"
        });
      }
    });
  } else if (req.body.menutype == "dinner") {
    connection.query("INSERT INTO menu_dinner SET ?", menu, function(
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
          success: "dinner menu add sucessfully"
        });
      }
    });
  }
};

exports.deleteMenu = function(req, res) {
  console.log("type fwwe is", req.body.menutype);
  console.log("req:" + req.body.id + "f" + req.params);
  if (req.body.menutype == "breakfast") {
    connection.query(
      "DELETE FROM menu_breakfast WHERE id = ?",
      req.body.id,
      function(error, results, fields) {
        if (error) {
          console.log("error ocurred", error);
          res.send({
            code: 233,
            failed: "error ocurred"
          });
        } else {
          console.log("The solution is: ", results);
          res.send({
            code: 200,
            success: "breakfast menu delete sucessfully"
          });
        }
      }
    );
  } else if (req.body.menutype == "lunch") {
    connection.query(
      "DELETE FROM menu_lunch WHERE id = ?",
      req.body.id,
      function(error, results, fields) {
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
            success: "lunch menu delete sucessfully"
          });
        }
      }
    );
  } else if (req.body.menutype == "dinner") {
    connection.query(
      "DELETE FROME menu_dinner WHERE id = ?",
      req.body.id,
      function(error, results, fields) {
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
            success: "dinner menu delete sucessfully"
          });
        }
      }
    );
  }
};
