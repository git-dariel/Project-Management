const express = require("express");
const {
  currentUser,
  loginUser,
} = require("../../controller/users/signin-controller");
const validateToken = require("../../middleware/validate-token-handler");
const router = express.Router();

router.route("/users/login").post(loginUser);
router
  .route("/current")
  .get(validateToken, currentUser)
  .post(validateToken, currentUser);

module.exports = router;
