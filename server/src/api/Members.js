const db = require("../config/Connection.js");

// this function add a new member
const addMember = (req, res) => {
  const { groupId, memberName, dateAddMembers } = req.body;

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

      // Check if memberName already exists in the group
      if (existingMembers.includes(memberName)) {
        return res
          .status(409)
          .json({ message: "Member already exists in the group" });
      }

      existingMembers.push({ name: memberName, isActive: true });

      db.query(
        "UPDATE groupproject SET members = ?, date_of_added_member = ? WHERE group_id = ?",
        [JSON.stringify(existingMembers), dateAddMembers, groupId],
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

//this function deactivate members
const deactivateMember = (req, res) => {
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
        // Check if members is already an object (or array)
        if (typeof results[0].members === "object") {
          existingMembers = results[0].members;
        } else {
          // If it's a string, attempt to parse it
          existingMembers = JSON.parse(results[0].members);
        }
      } catch (parseError) {
        console.error("Failed to parse members data:", parseError);
        return res
          .status(500)
          .json({ message: "Failed to parse members data" });
      }

      const memberIndex = existingMembers.findIndex(
        (member) => member.name === memberId
      );
      if (memberIndex === -1) {
        return res.status(404).json({ message: "Member not found in group" });
      }

      existingMembers[memberIndex].isActive = false;

      db.query(
        "UPDATE groupproject SET members = ? WHERE group_id = ?",
        [JSON.stringify(existingMembers), groupId],
        (updateError) => {
          if (updateError) {
            console.error("Error updating members:", updateError);
            return res.status(500).json({ message: "Error updating members" });
          }
          res.status(200).json({ message: "Member successfully deactivated" });
        }
      );
    }
  );
};

//this function activateMember members
const activateMember = (req, res) => {
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
        // Check if members is already an object (or array)
        if (typeof results[0].members === "object") {
          existingMembers = results[0].members;
        } else {
          // If it's a string, attempt to parse it
          existingMembers = JSON.parse(results[0].members);
        }
      } catch (parseError) {
        console.error("Failed to parse members data:", parseError);
        return res
          .status(500)
          .json({ message: "Failed to parse members data" });
      }

      const memberIndex = existingMembers.findIndex(
        (member) => member.name === memberId
      );
      if (memberIndex === -1) {
        return res.status(404).json({ message: "Member not found in group" });
      }

      existingMembers[memberIndex].isActive = true;

      db.query(
        "UPDATE groupproject SET members = ? WHERE group_id = ?",
        [JSON.stringify(existingMembers), groupId],
        (updateError) => {
          if (updateError) {
            console.error("Error updating members:", updateError);
            return res.status(500).json({ message: "Error updating members" });
          }
          res.status(200).json({ message: "Member successfully activated" });
        }
      );
    }
  );
};

// this function getting the data of Members
const getMembers = (req, res) => {
  const groupId = req.body.groupId;

  if (!groupId) {
    return res.status(400).json({ message: "groupId is required" });
  } else {
    db.query(
      "SELECT * FROM groupproject WHERE group_id = ?",
      [groupId],
      (err, result) => {
        if (err) {
          return res.status(404).json({ error: "Error getting members", err });
        } else if (result.length <= 0) {
          return res.status(404).json({ error: "No members found" });
        } else {
          db.query(
            "SELECT members, date_of_added_member from groupproject WHERE group_id = ?",
            [groupId],
            (err, result) => {
              if (err) {
                return res
                  .status(404)
                  .json({ error: "Error getting members", err });
              } else {
                return res.status(200).json({ members: result });
              }
            }
          );
        }
      }
    );
  }
};

module.exports = { deactivateMember, addMember, getMembers, activateMember };
