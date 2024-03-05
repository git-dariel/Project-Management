const express = require("express");
const { usersAuth, getUsers } = require("../controllers/signup-controller");
const router = express.Router();

// Signup routes
router.route("/users").get(getUsers);
router.route("/users/signup").post(usersAuth);

module.exports = router;
