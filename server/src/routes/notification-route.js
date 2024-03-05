const express = require("express");
const {
  getNotifications,
  addNotifications,
  deleteNotification,
} = require("../controllers/notification-controller");
const router = express.Router();

// Notification routes
router.route("/notification").get(getNotifications);
router.route("/notification").post(addNotifications);
router.route("/notification/:id").delete(deleteNotification);

module.exports = router;
