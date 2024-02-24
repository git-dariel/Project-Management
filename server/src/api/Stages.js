const db = require("../config/Connection.js");

const addStages = (req, res) => {
  const { stageName } = req.body;

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
            "INSERT INTO stages (stage_name) VALUES (?)",
            [stageName],
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

const addTasks = (req, res) => {
  const {
    stagesID,
    taskName,
    assignedMembers,
    progress,
    weight,
    startOfTask,
    endOfTask,
    actualEndOfTask,
    aging,
    daysTasksToComplete,
  } = req.body;

  if (
    !stagesID ||
    !taskName ||
    !assignedMembers ||
    !progress ||
    !weight ||
    !startOfTask ||
    !endOfTask ||
    !actualEndOfTask ||
    !daysTasksToComplete
  ) {
    return res.status(500).json({ message: "All fields are required." });
  } else {
    // Check if the specified stagesID exists in the stages table
    db.query(
      "SELECT * FROM stages WHERE stages_id = ?",
      [stagesID],
      (err, stageResult) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error checking stage existence" });
        } else if (stageResult.length === 0) {
          return res.status(400).json({ message: "Invalid stagesID" });
        } else {
          // if the stage exists, insert the data into the tasks table
          db.query(
            "INSERT INTO tasks (stages_id, task_name, assigned_members, progress, weight, start_of_task, end_of_task, actual_end_task, aging, days_per_tasks_to_complete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              stagesID,
              taskName,
              JSON.stringify(assignedMembers),
              progress,
              weight,
              startOfTask,
              endOfTask,
              actualEndOfTask,
              aging,
              daysTasksToComplete,
            ],
            (err, result) => {
              if (err) {
                return res
                  .status(400)
                  .json({ error: "Error inserting task", err });
              } else {
                return res
                  .status(200)
                  .json({ message: "Task successfully added", result });
              }
            }
          );
        }
      }
    );
  }
};

module.exports = { addStages, addTasks };
