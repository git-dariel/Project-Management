const db = require("../config/Connection.js");

// this function create groups
const addGroups = (req, res) => {
  const { groupName, teamLeader, description, members, endOfProject } =
    req.body;

  if (!groupName || !teamLeader || !description || !members || !endOfProject) {
    return res.status(400).json({ message: "All fields are required." });
  } else {
    // Ensure members is an array
    if (!Array.isArray(members)) {
      // If members is a comma-separated string, convert it to an array
      if (typeof members === "string") {
        members = members.split(",");
      } else {
        // If members is neither an array nor a string, return an error
        return res.status(400).json({ message: "Invalid format for members." });
      }
    }

    // Check if the group already exists
    db.query(
      "SELECT * FROM groupproject WHERE group_name = ?",
      [groupName],
      (err, result) => {
        if (err) {
          console.error("Error checking if group already exists:", err);
          return res
            .status(500)
            .json({ message: "Error checking if group already exists" });
        }
        // If the group already exists, return an error message
        else if (result.length > 0) {
          return res.status(409).json({ message: "Group already exists" });
        } else {
          // If the group does not exist, insert into the database
          db.query(
            "INSERT INTO groupproject (group_name, team_leader, group_description, members, end_of_project)VALUES (?, ?, ?, ? ,?)",
            [
              groupName,
              teamLeader,
              description,
              JSON.stringify(members),
              endOfProject,
            ],
            (err, result) => {
              if (err) {
                console.error("Error inserting into groupproject table:", err);
                return res
                  .status(500)
                  .json({ message: "Error inserting into groupproject table" });
              } else {
                return res
                  .status(201)
                  .json({ message: "Group successfully created" });
              }
            }
          );
        }
      }
    );
  }
};

// this function update the groups
const updateGroups = (req, res) => {
  const { groupName, teamLeader, description, members, endOfProject } =
    req.body;

  if (!groupName || !teamLeader || !description || !members || !endOfProject) {
    return res.status(400).json({ message: "All fields are required." });
  } else {
    db.query(
      "UPDATE groupproject SET group_name = ?, team_leader = ?, group_description = ?, members = ?, end_of_project = ? WHERE group_id = ?",
      [
        groupName,
        teamLeader,
        description,
        JSON.stringify(members),
        endOfProject,
        req.params.id,
      ],
      (error, results) => {
        if (error) {
          console.error("Error updating group", error);
          res
            .status(500)
            .json({ message: "An error occurred while updating the group." });
        } else {
          res.status(200).json({ message: "Group successfully updated" });
        }
      }
    );
  }
};

// this function delete the groups
const deleteGroup = (req, res) => {
  db.query(
    "DELETE FROM groupproject WHERE group_id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error deleting group", error);
        res
          .status(500)
          .json({ message: "An error occurred while deleting the group." });
      } else {
        res.status(200).json({ message: "Group successfully deleted" });
      }
    }
  );
};

module.exports = { addGroups, updateGroups, deleteGroup };
