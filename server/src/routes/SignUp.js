const db = require("../config/Connection");
const bcrypt = require("bcrypt");

// number of saltrounds for bcrypt
const saltRounds = 10;

// function to handle the sign-up auth
const usersAuth = (req, res) => {
  // get the user details from the request object on the client side.
  const { firstname, lastname, position, email, password } = req.body;

  console.log("req.body:", req.body);

  // Validate required fields
  if (!password || !email || !firstname || !lastname || !position) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the user already exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (selectErr, selectResult) => {
      if (selectErr) {
        console.error("Error checking existing user:", selectErr);
        return res
          .status(500)
          .json({ message: "Error checking existing user" });
      }
      // If the user already exists, return an error
      else if (selectResult.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        // If the user does not exist, hash the password and insert into the database
        bcrypt.hash(password, saltRounds, (hashErr, hash) => {
          if (hashErr) {
            console.error("Error hashing password:", hashErr);
            return res.status(500).json({ message: "Error hashing password" });
          }

          // inserting user data into the database
          db.query(
            "INSERT INTO users (firstname, lastname, position, email, password) VALUES (?, ?, ?, ?, ?)",
            [firstname, lastname, position, email, hash],
            (insertErr, result) => {
              if (insertErr) {
                console.error(
                  "Error inserting user into the database:",
                  insertErr
                );
                return res
                  .status(500)
                  .json({ message: "Error registering user" });
              }

              // Sending response upon successful registration
              res.json({ message: "User registered successfully" });
            }
          );
        });
      }
    }
  );
};

module.exports = { usersAuth };
