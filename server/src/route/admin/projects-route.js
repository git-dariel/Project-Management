const express = require("express");
const {
  createProject,
  getProjects,
} = require("../../controller/admin/projects-controller");

const router = express.Router();

router.use(require("../../middleware/validate-token-handler"));
router.route("/project").get(getProjects);
router.route("/project").post(createProject);

module.exports = router;
