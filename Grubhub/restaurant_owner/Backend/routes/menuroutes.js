// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "127.0.0.1", //3306
//   user: "root",
//   password: "shirley123",
//   database: "grubHub"
// });
// connection.connect(function(err) {
//   if (!err) {
//     console.log("Database is connected ... nn");
//   } else {
//     console.log("Error connecting database ... nn" + err);
//   }
// });
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "grabhub";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};

//var id = null; //mySQL auto generate unique ID starting from null
exports.addBreakfast = function(req, res) {
  var today = new Date();
  var menu = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    created: today
  };
  console.log("type is", req.body.menutype);
  if (req.body.menutype == "breakfast") {
    MongoClient.connect(url, options1, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to MongoDB server.");
      const db = client.db(dbName);
      mongodb = db;
      db.collection("breakfast").insertOne(menu, function(error, results) {
        assert.equal(err, null);
        console.log("Inserted doc");
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
    });
  } else if (req.body.menutype == "lunch") {
    MongoClient.connect(url, options1, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to MongoDB server.");
      const db = client.db(dbName);
      mongodb = db;
      db.collection("lunch").insertOne(menu, function(error, results) {
        assert.equal(err, null);
        console.log("Inserted doc");
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
    });
  } else if (req.body.menutype == "dinner") {
    MongoClient.connect(url, options1, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to MongoDB server.");
      const db = client.db(dbName);
      mongodb = db;
      db.collection("dinner").insertOne(menu, function(error, results) {
        assert.equal(err, null);
        console.log("Inserted doc");
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
    });
  }
};

exports.deleteMenu = function(req, res) {
  console.log("type fwwe is", req.body.menutype);
  console.log("req:" + req.body.id + "f" + req.params);
  if (req.body.menutype == "breakfast") {
    const db = client.db(dbName);
    mongodb = db;
    db.collection("breakfast").drop({ _id: req.body.id }, function(
      error,
      results
    ) {
      assert.equal(err, null);
      console.log("Inserted doc");
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
    });
  } else if (req.body.menutype == "lunch") {
    const db = client.db(dbName);
    mongodb = db;
    db.collection("lunch").drop({ _id: req.body.id }, function(error, results) {
      assert.equal(err, null);
      console.log("Inserted doc");
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
    });
  } else if (req.body.menutype == "dinner") {
    const db = client.db(dbName);
    mongodb = db;
    db.collection("lunch").drop({ _id: req.body.id }, function(error, results) {
      assert.equal(err, null);
      console.log("Inserted doc");
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
    });
  }
};
