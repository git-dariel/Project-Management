const db = require("../../database/db-connection.js");

const addNotifications = (req, res) => {
  const { title, description, dateAndTime } = req.body;
  const query =
    "INSERT INTO notification (title, description, dateNow) VALUES (?,?,?)";
  const values = [title, description, dateAndTime];
  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to add notification",
        err: err,
      });
    } else {
      res.status(201).json({
        message: "Notification added successfully",
        data: result,
      });
    }
  });
};

const deleteNotification = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM notification WHERE notifId = ?";
  const values = [id];
  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to delete notification",
        err: err,
      });
    } else {
      res.status(200).json({
        message: "Notification deleted successfully",
        data: result,
      });
    }
  });
};

const getNotifications = (req, res) => {
  const query = "SELECT * FROM notification";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to get notifications",
        err: err,
      });
    } else {
      res.status(200).json({
        message: "Notifications retrieved successfully",
        data: result,
      });
    }
  });
};

module.exports = { addNotifications, deleteNotification, getNotifications };
