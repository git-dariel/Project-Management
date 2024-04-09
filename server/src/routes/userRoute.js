const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validateTokenHandler')
const userService = require('../services/userService')
const { API_ENDPOINTS } = require('../config/endpointsConfig')

router.route(API_ENDPOINTS.USER.REGISTER.GET).get(userService.getUsers)
router.route(API_ENDPOINTS.USER.REGISTER.POST).post(userService.registerUser)
router.route(API_ENDPOINTS.USER.REGISTER.GETBYID).get(validateToken, userService.getUser)
router.route(API_ENDPOINTS.USER.REGISTER.UPDATE).put(validateToken, userService.updateUser)
router.route(API_ENDPOINTS.USER.REGISTER.DELETE).delete(validateToken, userService.deleteUser)
router.route(API_ENDPOINTS.USER.LOGIN.POST).post(userService.loginUser)
router.route(API_ENDPOINTS.USER.LOGIN.GET).get(validateToken, userService.currentUser)

module.exports = router
