var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("I'm stores main router!");
});
router.get("/list", function(req, res, next) {
  res.send("/stores/list !!");
});
router.get("/info", function(req, res, next) {
  res.send("/stores/info !!");
});

module.exports = router;
