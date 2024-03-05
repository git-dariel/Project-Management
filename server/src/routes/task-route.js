const express = require("express");
const { getTasks, addTasks } = require("../controllers/task-controller");
const router = express.Router();

router.route("/task").get(getTasks);
router.route("/task").post(addTasks);

module.exports = router;