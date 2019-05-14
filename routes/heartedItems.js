var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.get("/list", controllers.heartedItems.list.get);
router.post("/add", controllers.heartedItems.add.post);
router.delete("/delete", controllers.heartedItems.delete.delete);

module.exports = router;
