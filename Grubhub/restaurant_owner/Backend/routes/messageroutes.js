var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "grabhub";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};

exports.getTextbox = function(req, res) {
  console.log("Print id  " + req.query.orderId);
  var data = {
    buyerId: req.query.buyerId,
    orderId: req.query.orderId
  };
  MongoClient.connect(url, options1, function(err, client) {
    //assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("messages")
      .find({ id: data.orderId })
      .toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
        //db.close();
      });
  });
};

exports.getOrder = function(req, res) {
  MongoClient.connect(url, options1, function(err, client) {
    //assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("customers")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        //var myCart = result.query.userId;
        // console.log(result);
        res.send(result);
        //db.close();
      });
  });
};
