const asyncHandler = require("express-async-handler");
const Project = require("../../models/projects-model");

//*desc Get all Projects
//*route GET /api/users/project
//*access private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user_id: req.user.id });
  res.status(200).json(projects);
});

//*desc Projects
//*route POST /api/users/project
//*access private
const createProject = asyncHandler(async (req, res) => {
  const { project_name, description, start_date, end_date, stages, tasks } =
    req.body;

  if (!project_name || !description || !start_date || !end_date) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  } else {
    const projectAvailable = await Project.findOne({ project_name });
    if (projectAvailable) {
      res.status(400);
      throw new Error("Project already exists!");
    } else {
      const project = await Project.create({
        project_name,
        description,
        start_date,
        end_date,
        stages,
        tasks,
        user_id: req.user.id,
      });
      res.status(201).json(project);
    }
  }
});

module.exports = {
  getProjects,
  createProject,
};
