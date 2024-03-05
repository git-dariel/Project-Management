const db = require("../../database/db-connection.js");

const addStages = (req, res) => {
  const { stageName } = req.body;
  const { groupId } = req.body;

  if (!stageName) {
    return res.status(500).json({ message: "All fields are required." });
  } else {
    // check if the group already exist
    db.query(
      "SELECT * FROM stages WHERE stage_name = ?",
      [stageName],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error checking if stage already exists" });
        } else if (result.length > 0) {
          return res.status(400).json({ message: "Stage already exists" });
        } else {
          // if not, insert the data into database
          db.query(
            "INSERT INTO stages (group_id, stage_name) VALUES (?, ?)",
            [groupId, stageName],
            (err, result) => {
              if (err) {
                return res
                  .status(400)
                  .json({ error: "Error inserting stages", err });
              } else {
                return res
                  .status(200)
                  .json({ message: "Stages successfully added", result });
              }
            }
          );
        }
      }
    );
  }
};

const updateStage = (req, res) => {
  const { stageName } = req.body;

  if (!stageName) {
    return res.status(500).json({ message: "All fields are required." });
  } else {
    db.query(
      "UPDATE stages SET stage_name = ? WHERE stages_id =?",
      [stageName, req.params.id],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error updating stages", err });
        } else {
          return res
            .status(200)
            .json({ message: "Stages successfully updated", result });
        }
      }
    );
  }
};

const deleteStage = (req, res) => {
  db.query(
    "SELECT * FROM stages WHERE stages_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error getting stages", err });
      } else if (result.length <= 0) {
        return res.status(404).json({ error: "Stage not found" });
      } else {
        db.query(
          "DELETE FROM stages WHERE stages_id =?",
          [req.params.id],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error deleting stages", err });
            } else {
              return res
                .status(200)
                .json({ message: "Stages successfully deleted", result });
            }
          }
        );
      }
    }
  );
};

const getStages = (req, res) => {
  db.query("SELECT * FROM stages", (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error getting stages", err });
    } else {
      return res.status(200).json({ stages: result });
    }
  });
};

module.exports = { addStages, updateStage, deleteStage, getStages };
