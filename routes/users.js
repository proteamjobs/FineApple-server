var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("/users !!");
});
router.get("/signin", function(req, res, next) {
  res.send("/users/signin !!");
});
router.post("/signup", function(req, res, next) {
  res.send(`/users/signup !! ${req.body}`);
});

module.exports = router;
