var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.get("/signin", controllers.users.signin.get);
router.post("/signup", controllers.users.signup.post);

module.exports = router;
