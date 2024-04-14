const express = require('express')
const router = express.Router()
const projectService = require('../services/projectsService')
const { API_ENDPOINTS } = require('../config/endpointsConfig')

router.route(API_ENDPOINTS.PROJECT.GET).get(projectService.getProjects)
router.route(API_ENDPOINTS.PROJECT.POST).post(projectService.createProject)
router.route(API_ENDPOINTS.PROJECT.UPDATE).put(projectService.updateProject)
router.route(API_ENDPOINTS.PROJECT.DELETE).delete(projectService.deleteProject)
router.route(API_ENDPOINTS.PROJECT.ADDMEMBER).post(projectService.addMemberToProject)

module.exports = router
