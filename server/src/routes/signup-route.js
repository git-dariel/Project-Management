const express = require("express");
const { usersAuth, getUsers } = require("../controllers/signup-controller");
const router = express.Router();

// Signup routes
router.route("/").get(getUsers);
router.route("/").post(usersAuth);

module.exports = router;
