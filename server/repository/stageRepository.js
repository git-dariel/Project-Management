const Stage = require('../models/stageModel');
const Project = require('../models/projectModel');

const stageRepository = {
  getStages: getStages,
  findById: findById,
  findOne: findOne,
  createStage: createStage,
};

module.exports = stageRepository;

async function getStages() {
  try {
    return await Stage.find();
  } catch (error) {
    return error;
  }
}

async function findById(id) {
  try {
    return await Project.findById(id);
  } catch (error) {
    return error;
  }
}
async function findOne(projectId, name) {
  try {
    return await Stage.findOne({ projectId: projectId, name: name });
  } catch (error) {
    return error;
  }
}

async function createStage(stage) {
  try {
    const newStage = new Stage(stage);
    return await newStage.save();
  } catch (error) {
    return error;
  }
}
