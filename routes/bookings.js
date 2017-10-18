var express = require('express');
var router = express.Router();


//Set up firebase
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

//Initalize firebase database
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://donna-60361.firebaseio.com"
});


/* GET all bookings. */
router.get('/', function(req, res, next) {
  console.log("GET CALLED FROM BOT");
  console.log(req.params.query);
  res.send(200);
});

//Add a booking to database
router.post('/', function(req, res, next) {
  console.log("API called - Adding a new location");
  var newLocation = req.body;
  admin.database().ref('bookings').push(newLocation);
  res.send(200);
});

module.exports = router;
