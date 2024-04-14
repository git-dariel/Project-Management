const stageRepository = require('../repository/stageRepository');
const { trimAll } = require('../config/commonConfig');
const { constants } = require('../config/constantsConfig');

const stageService = {
  getStages: getStages,
  createStage: createStage,
};

module.exports = stageService;

async function getStages(req, res) {
  try {
    const stages = await stageRepository.getStages();
    res.status(200).json(stages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createStage(req, res) {
  const trimmedBody = trimAll(req.body);
  const { name, startDate, endDate } = trimmedBody;
  const { projectId } = req.params;

  try {
    if (!name || !startDate || !endDate || !projectId)
      return res.status(400).json({
        message: constants.ERROR.STAGE.REQUIRED_FIELDS,
      });
    const project = await stageRepository.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: constants.ERROR.PROJECT.NOT_FOUND });
    }

    const existingStage = await stageRepository.findOne(projectId, name);

    if (existingStage) {
      return res.status(400).json({ message: constants.ERROR.STAGE.ALREADY_EXISTS });
    }

    if (!project.stages) {
      project.stages = [];
    }

    const stage = await stageRepository.createStage({
      name,
      startDate,
      endDate,
      projectId,
    });
    project.stages.push(stage._id);
    await project.save();
    res.status(200).json({ message: constants.SUCCESS.STAGE.CREATE, stage });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
