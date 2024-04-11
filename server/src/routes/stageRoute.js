const express = require('express')
const router = express.Router()
const stageService = require('../services/stageService')
const { API_ENDPOINTS } = require('../config/endpointsConfig')

router.route(API_ENDPOINTS.STAGE.GET).get(stageService.getStages)
router.route(API_ENDPOINTS.STAGE.POST).post(stageService.createStage)

module.exports = router
