var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.get("/list", controllers.products.list.get);

module.exports = router;
