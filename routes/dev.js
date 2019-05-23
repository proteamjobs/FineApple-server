var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.get("/crawlerStores", controllers.dev.crawlerStores.get);

module.exports = router;
