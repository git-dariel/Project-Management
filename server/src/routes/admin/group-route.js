const express = require("express");
const {
  getGroups,
  addGroups,
  updateGroup,
  deleteGroup,
} = require("../../controllers/admin/group-controller");
const router = express.Router();

// Group routes
router.route("/groups").get(getGroups);
router.route("/groups").post(addGroups);
router.route("/groups/:id").put(updateGroup);
router.route("/groups/:id").delete(deleteGroup);

module.exports = router;
