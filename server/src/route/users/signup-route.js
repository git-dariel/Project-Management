const express = require("express");
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controller/users/signup-controller");
const router = express.Router();

router.route("/users").get(getUsers).post(addUser);
router.route("/users/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
