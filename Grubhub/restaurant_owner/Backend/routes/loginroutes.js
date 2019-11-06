//added
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const passport = require("passport");
//
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
// var id = null; //mySQL auto generate unique ID starting from null
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "grabhub";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};

exports.register = function(req, res) {
  // console.log("req",req.body);
  var today = new Date();
  console.log("Print here + " + req.body.cuisine + req.body.name);
  var owner = {
    name: req.body.name,
    zipcode: req.body.zipcode,
    //id: id, //req.body.id,
    restaurant_name: req.body.restaurant_name,
    email: req.body.email,
    password: req.body.password,
    cuisine: req.body.cuisine,
    created: today
  };
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("owner").insertOne(owner, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted doc for " + owner.id);
    });
  });

  // connection.query("INSERT INTO owner SET ?", owner, function(
  //   error,
  //   results,
  //   fields
  // ) {
  //   if (error) {
  //     console.log("error ocurred", error);
  //     res.send({
  //       code: 401,
  //       failed: "error ocurred"
  //     });
  //   } else {
  //     console.log("The solution is: ", results);
  //     res.send({
  //       code: 200,
  //       success: "user registered sucessfully"
  //     });
  //   }
  // });
};

exports.login = function(req, res) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(err);
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      //const token = jwt.sign(user, "your_jwt_secret");
      const token = jwt.sign(JSON.stringify(user), "your_jwt_secret");

      return res.json({ user, token });
    });
  })(req, res);
};
