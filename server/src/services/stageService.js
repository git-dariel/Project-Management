const asyncHandler = require('express-async-handler');
const Stage = require('../models/stageModel');
const Project = require('../models/projectModel');
const { trimAll } = require('../config/commonConfig');

//*Get all stages, access private
const getStages = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find().populate('stages');
    const stages = projects.map((project) => project.stages).flat();
    res.status(200).json(stages);
  } catch (error) {
    res.status(404);
    throw error;
  }
});

//*Create a new stage, access private
const createStage = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body);
  const { name, startDate, endDate, projectId, tasks = [] } = trimmedBody;

  try {
    if (!name || !startDate || !endDate || !projectId)
      return res.status(400).json({
        message: 'Please provide all required stage details including the bucketId.',
      });
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const existingStage = project.stages.find((stage) => stage.name === name);
    if (existingStage) {
      return res.status(409).json({ message: 'Stage with that name already exists!' });
    }

    const stage = new Stage({
      name,
      startDate,
      endDate,
      tasks,
    });

    project.stages.push(stage);
    await project.save();
    res.status(200).json(stage);
  } catch (error) {
    res.status(400);
    throw error;
  }
});

const stageService = {
  getStages: getStages,
  createStage: createStage,
};

module.exports = stageService;
