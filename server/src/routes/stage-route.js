const express = require("express");
const {
  getStages,
  addStages,
  updateStage,
  deleteStage,
} = require("../controllers/stage-controller");
const router = express.Router();

// Stage routes
router.route("/stage").get(getStages);
router.route("/stage").post(addStages);
router.route("/stage/:id").put(updateStage);
router.route("/stage/:id").delete(deleteStage);

module.exports = router;
