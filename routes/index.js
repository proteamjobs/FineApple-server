var express = require("express");
var router = express.Router();
const db = require("../models");

router.get("/", function(req, res, next) {
  res.send("This is index router!!");
});

// router.get("/products", function(req, res, next) {
//   res.send("This is /products API");
// });

// router.get("/", function(req, res, next) {
//   res.send("helloworld");
// });

// router.get("/", function(req, res, next) {
//   res.send("helloworld");
// });

module.exports = router;
