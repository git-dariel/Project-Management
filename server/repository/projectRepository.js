const Project = require('../models/projectModel');
const { constants } = require('../config/constantsConfig');

const projectRepository = {
  getProjects: getProjects,
  getProject: getProject,
  findOne: findOne,
  createProject: createProject,
  addMember: addMember,
  updateProject: updateProject,
  deleteProject: deleteProject,
};

module.exports = projectRepository;

async function getProjects(id) {
  try {
    return await Project.find({ createdBy: id })
      .populate({
        path: constants.POPULATE.PROJECT.PATH,
        select: constants.POPULATE.PROJECT.SELECT,
      })
      .populate({
        path: constants.POPULATE.USER.PATH,
        select: constants.POPULATE.USER.SELECT,
      });
  } catch (error) {
    return error;
  }
}

async function getProject(id) {
  try {
    return await Project.findById(id);
  } catch (error) {
    return error;
  }
}

async function findOne(name) {
  try {
    return await Project.findOne({ name: name });
  } catch (error) {
    return error;
  }
}

async function createProject(data) {
  try {
    return await Project.create(data);
  } catch (error) {
    return error;
  }
}

async function addMember(id) {
  try {
    return await Project.findById(id).populate({
      path: constants.POPULATE.PROJECT.PATH,
      select: constants.POPULATE.PROJECT.SELECT,
    });
  } catch (error) {
    return error;
  }
}

async function updateProject(id, data) {
  try {
    return await Project.findByIdAndUpdate(id, data, { new: true }).populate({
      path: constants.POPULATE.PROJECT.PATH,
      select: constants.POPULATE.PROJECT.SELECT,
    });
  } catch (error) {
    return error;
  }
}

async function deleteProject(id) {
  try {
    return await Project.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
}
