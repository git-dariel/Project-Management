const Project = require('../models/projectModel')

const getProjects = async (id) => {
  try {
    return await Project.find({ createdBy: id })
      .populate({
        path: 'members.userId',
        select: 'firstname lastname email role',
      })
      .populate({
        path: 'createdBy',
        select: 'firstname lastname role',
      })
  } catch (error) {
    return error
  }
}

const getProject = async (id) => {
  try {
    return await Project.findById(id)
  } catch (error) {
    return error
  }
}

const findOne = async (data) => {
  try {
    return await Project.findOne({ data: data })
  } catch (error) {
    return error
  }
}

const createProject = async (data) => {
  try {
    return await Project.create(data)
  } catch (error) {
    return error
  }
}

const addMember = async (id) => {
  try {
    return await Project.findById(id).populate({
      path: 'members.userId',
      select: 'firstname lastname email role',
    })
  } catch (error) {
    return error
  }
}

const updateProject = async (id, data) => {
  try {
    return await Project.findByIdAndUpdate(id, data, { new: true }).populate({
      path: 'members.userId',
      select: 'firstname lastname email role',
    })
  } catch (error) {
    return error
  }
}

const deleteProject = async (id) => {
  try {
    return await Project.findByIdAndDelete(id)
  } catch (error) {
    return error
  }
}

const projectRepository = {
  getProjects: getProjects,
  getProject: getProject,
  findOne: findOne,
  createProject: createProject,
  addMember: addMember,
  updateProject: updateProject,
  deleteProject: deleteProject,
}

module.exports = projectRepository
