const express = require("express");
const {
  getGroups,
  addGroups,
  updateGroups,
  deleteGroup,
} = require("../controllers/group-controller");
const router = express.Router();

// Group routes
router.route("/").get(getGroups);
router.route("/").post(addGroups);
router.route("/:id").put(updateGroups);
router.route("/:id").delete(deleteGroup);

module.exports = router;
