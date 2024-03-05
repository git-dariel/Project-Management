const express = require("express");
const {
  userLogIn,
  getUserLoginStatus,
} = require("../controllers/signin-controller");
const router = express.Router();

// Signin routes
router.route("/users/status").get(getUserLoginStatus);
router.route("/users/signin").post(userLogIn);

module.exports = router;
