var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("/products !!");
});
router.get("/list", function(req, res, next) {
  res.send("/products/list !!");
});

module.exports = router;
