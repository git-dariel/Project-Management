const express = require("express");
const {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controller/users/signup-controller");
const router = express.Router();

router.route("/users/register").post(registerUser);
router.route("/users/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
