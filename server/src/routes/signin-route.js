const express = require("express");
const { userLogIn, checkLogin } = require("../controllers/signin-controller");
const router = express.Router();

// Signin routes
router.route("/").get(checkLogin);
router.route("/").post(userLogIn);

module.exports = router;
