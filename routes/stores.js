var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

/* GET users listing. */
router.get("/list", controllers.stores.list.get);
router.get("/info", controllers.stores.info.get);

module.exports = router;
