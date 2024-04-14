const express = require('express');
const { MSG } = require('../config/commonConfig');
const { API_ENDPOINTS } = require('../config/endpointsConfig');
const router = express.Router();

router.get(API_ENDPOINTS.MAIN.DEFAULT, (req, res) => {
  res.send({
    status: res.statusCode,
    message: MSG.WELCOME,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
