var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("/heartedItems !!");
});
router.get("/list", function(req, res, next) {
  res.send("/heartedItems/list !!");
});
router.post("/add", function(req, res, next) {
  res.send(`/heartedItems/add !! ${req.body}`);
});
router.delete("/delete", function(req, res, next) {
  res.send(`OK !! ${req.body}`);
});

module.exports = router;
