const projectRepository = require('../repository/projectRepository');
const { trimAll } = require('../config/commonConfig');
const { constants } = require('../config/constantsConfig');

const projectService = {
  getProjects: getProjects,
  createProject: createProject,
  addMemberToProject: addMemberToProject,
  updateProject: updateProject,
  deleteProject: deleteProject,
};

module.exports = projectService;

async function getProjects(req, res) {
  try {
    const projects = await projectRepository.getProjects(req.user.id);
    res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createProject(req, res) {
  const trimmedBody = trimAll(req.body);
  const { name, description, startDate, endDate, members = [] } = trimmedBody;

  try {
    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ message: constants.ERROR.PROJECT.REQUIRED_FIELDS });
    }

    const projectAvailable = await projectRepository.findOne(name);
    if (projectAvailable) {
      return res.status(400).json({ message: constants.ERROR.PROJECT.ALREADY_EXISTS });
    }

    const project = await projectRepository.createProject({
      name,
      description,
      startDate,
      endDate,
      createdBy: req.user.id,
      members: members.map((userId) => ({ userId: userId, isActive: true })),
    });
    res.status(201).json({ message: constants.SUCCESS.PROJECT.CREATE, project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function addMemberToProject(req, res) {
  const { userId } = req.body;
  const { projectId } = req.params;
  try {
    let project = await projectRepository.getProject(projectId);
    if (!project) {
      return res.status(404).json({ message: constants.ERROR.PROJECT.NOT_FOUND });
    }

    await project.addMember(userId);
    project = await projectRepository.addMember(projectId);
    res.status(200).json({ message: constants.SUCCESS.PROJECT.ADD_MEMBER, project });
  } catch (error) {
    if (error.message === constants.ERROR.PROJECT.MEMBER_EXISTS) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
}

async function updateProject(req, res) {
  const trimmedBody = trimAll(req.body);
  const { name, description, startDate, endDate } = trimmedBody;

  try {
    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ message: constants.ERROR.PROJECT.REQUIRED_FIELDS });
    }

    const updatedProject = await projectRepository.updateProject(req.params.id, {
      name,
      description,
      startDate,
      endDate,
    });

    if (!updatedProject) {
      return res.status(400).json({ message: constants.ERROR.PROJECT.NOT_FOUND });
    }
    res.status(200).json(constants.SUCCESS.PROJECT.UPDATE, updatedProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteProject(req, res) {
  try {
    const deletedProject = await projectRepository.deleteProject(req.params.id);
    if (!deletedProject) {
      return res.status(400).json({ message: constants.ERROR.PROJECT.NOT_FOUND });
    }
    res.status(200).json({ message: constants.SUCCESS.PROJECT.DELETE, project: deletedProject });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
