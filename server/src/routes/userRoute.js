const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const { API_ENDPOINTS } = require("../config/endpointsConfig");

router.route(API_ENDPOINTS.USER.REGISTER.GET).get(userService.getUsers);
router.route(API_ENDPOINTS.USER.REGISTER.POST).post(userService.registerUser);
router.route(API_ENDPOINTS.USER.REGISTER.GETBYID).get(userService.getUser);
router.route(API_ENDPOINTS.USER.REGISTER.UPDATE).put(userService.updateUser);
router.route(API_ENDPOINTS.USER.REGISTER.DELETE).delete(userService.deleteUser);
router.route(API_ENDPOINTS.USER.LOGIN.POST).post(userService.loginUser);
router.route(API_ENDPOINTS.USER.LOGIN.GET).get(userService.currentUser);

module.exports = router;
