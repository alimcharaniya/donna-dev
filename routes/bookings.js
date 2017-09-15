var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  console.log("api called");
  console.log(req.data);
  res.send(200);
});

module.exports = router;
