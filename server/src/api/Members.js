const db = require("../config/Connection.js");

// this function add a new member
const addMember = (req, res) => {
  const { groupId, memberId } = req.body;

  db.query(
    "SELECT members FROM groupproject WHERE group_id = ?",
    [groupId],
    (error, results) => {
      if (error) {
        console.error("Error retrieving group:", error);
        return res.status(500).json({ message: "Error retrieving group" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Group not found" });
      }

      let existingMembers;
      try {
        if (typeof results[0].members === "string") {
          existingMembers = JSON.parse(results[0].members);
        } else {
          existingMembers = results[0].members;
        }
      } catch (parseError) {
        console.error("Failed to parse members data:", parseError);
        return res
          .status(500)
          .json({ message: "Failed to parse members data" });
      }

      // Check if memberId already exists in the group
      if (existingMembers.includes(memberId)) {
        return res
          .status(409)
          .json({ message: "Member already exists in the group" });
      }

      existingMembers.push(memberId);

      db.query(
        "UPDATE groupproject SET members = ? WHERE group_id = ?",
        [JSON.stringify(existingMembers), groupId],
        (updateError) => {
          if (updateError) {
            console.error("Error updating group members:", updateError);
            return res
              .status(500)
              .json({ message: "Error updating group members" });
          }
          res
            .status(200)
            .json({ message: "Member successfully added to group" });
        }
      );
    }
  );
};

//this function delete members
const deleteMember = (req, res) => {
  const { groupId, memberId } = req.params;

  db.query(
    "SELECT members FROM groupproject WHERE group_id = ?",
    [groupId],
    (error, results) => {
      if (error) {
        console.error("Error retrieving members:", error);
        return res.status(500).json({ message: "Error retrieving members" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Group not found" });
      }

      let existingMembers;
      try {
        // Check if results[0].members is a string that needs parsing
        if (typeof results[0].members === "string") {
          existingMembers = JSON.parse(results[0].members);
        } else {
          // If it's not a string, use it directly
          existingMembers = results[0].members;
        }
      } catch (parseError) {
        console.error(
          "Failed to parse members data:",
          results[0].members,
          parseError
        );
        return res
          .status(500)
          .json({ message: "Failed to parse members data" });
      }

      const memberIndex = existingMembers.indexOf(memberId);
      if (memberIndex === -1) {
        return res.status(404).json({ message: "Member not found in group" });
      }

      existingMembers.splice(memberIndex, 1);

      db.query(
        "UPDATE groupproject SET members = ? WHERE group_id = ?",
        [JSON.stringify(existingMembers), groupId],
        (updateError, updateResults) => {
          if (updateError) {
            console.error("Error updating members:", updateError);
            return res.status(500).json({ message: "Error updating members" });
          }
          res
            .status(200)
            .json({ message: "Member successfully deleted from group" });
        }
      );
    }
  );
};

module.exports = { deleteMember, addMember };
