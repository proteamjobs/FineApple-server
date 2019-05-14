var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("I'm heartedItems main router!");
});

module.exports = router;
