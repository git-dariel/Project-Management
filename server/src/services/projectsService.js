const asyncHandler = require('express-async-handler')
const projectRepository = require('../repository/projectRepository')
const { trimAll } = require('../config/commonConfig')

//*Get all Projects, access private
const getProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await projectRepository.getProjects(req.user.id)
    res.status(200).json(projects)
  } catch (error) {
    res.status(404)
    throw error
  }
})

//*Create Project, access private
const createProject = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body)
  const { name, description, startDate, endDate, stages = [], members = [] } = trimmedBody

  try {
    if (!name || !description || !startDate || !endDate) {
      throw new Error('Please provide all required project details.')
    }

    const projectAvailable = await projectRepository.findOne(name)
    if (projectAvailable) {
      throw new Error('Project with that name already exists!')
    }

    const project = await projectRepository.createProject({
      name,
      description,
      startDate,
      endDate,
      stages,
      createdBy: req.user.id,
      members: members.map((userId) => ({ userId: userId, isActive: true })),
    })
    res.status(201).json(project)
  } catch (error) {
    res.status(404)
    throw error
  }
})

//*Add a member in Project, access private
const addMemberToProject = asyncHandler(async (req, res) => {
  const { userId } = req.body
  const { projectId } = req.params
  try {
    let project = await projectRepository.getProject(projectId)
    if (!project) {
      res.status(404).json({ message: 'Project not found' })
      return
    }

    await project.addMember(userId)
    project = await projectRepository.addMember(projectId)
    res.status(200).json(project)
  } catch (error) {
    if (error.message === 'Member already exists in the project') {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

//*Update a Project, access private
const updateProject = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body)
  const { name, description, startDate, endDate, stages = [] } = trimmedBody

  try {
    const updatedProject = await projectRepository.updateProject(req.params.id, {
      name,
      description,
      startDate,
      endDate,
      stages,
    })

    if (!updatedProject) {
      throw new Error('Project not found')
    }
    res.status(200).json(updatedProject)
  } catch (error) {
    res.status(404)
    throw error
  }
})

//*Delete a Project, access private
const deleteProject = asyncHandler(async (req, res) => {
  try {
    const deletedProject = await projectRepository.deleteProject(req.params.id)
    if (!deletedProject) {
      throw new Error('Project not found')
    }
    res.status(200).json({ message: 'Project deleted successfully' })
  } catch (error) {
    res.status(400)
    throw error
  }
})

const projectService = {
  getProjects: getProjects,
  createProject: createProject,
  addMemberToProject: addMemberToProject,
  updateProject: updateProject,
  deleteProject: deleteProject,
}

module.exports = projectService
