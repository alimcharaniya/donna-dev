var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
// var database = firebase.database();

/* GET users listing. */
router.get('/', function(req, res) {
  console.log("api called");
  console.log(req.data);
  res.send(200);
});

module.exports = router;
