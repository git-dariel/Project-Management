const express = require("express");
const {
  currentUser,
  loginUser,
} = require("../../controller/users/signin-controller");
const validateToken = require("../../middleware/validate-token-handler");
const router = express.Router();

router.post("/users/login", loginUser);
router.get("/users/current", validateToken, currentUser);

module.exports = router;
