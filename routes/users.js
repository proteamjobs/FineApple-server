var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.post("/auth", controllers.users.auth.post);
router.post("/signup", controllers.users.signup.post);
router.delete("/delete", controllers.users.delete.delete);
router.delete("/deletebyid", controllers.users.deletebyid.delete);

module.exports = router;
