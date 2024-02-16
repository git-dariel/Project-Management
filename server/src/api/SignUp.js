const db = require("../config/Connection");
const bcrypt = require("bcrypt");

//number of saltrounds for bcrypt
const saltRounds = 10;

// function to handle the sign up auth
const usersAuth = (req, res) => {
  // get the user details from the request object on the client side.
  const { firstname, lastname, position, email, password } = req.body;

  console.log("req.body:", req.body);

  // Validate required fields
  if (!password || !email || !firstname || !lastname || !position) {
    return res.status(400).send({ message: "All fields are required" });
  }

  console.log("password:", password);

  // hash the password using bcrypt library
  bcrypt.hash(password, saltRounds, (err, hash) => {
    // error handling
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send({ message: "Error hashing password" });
    }

    // inserting user data into the database
    db.query(
      "INSERT INTO users (firstname, lastname, position, email, password) VALUES (?, ?, ?, ?, ?)",

      // Binding parameters to prevent SQL injection
      [firstname, lastname, position, email, hash],
      (err, result) => {
        // error handling
        if (err) {
          console.error("Error inserting user into database:", err);
          return res.status(500).send({ message: "Error registering user" });
        }
        if (result) {
          res.send(result);
        } else {
          res.send({ message: "Enter correct asked details" });
        }
      }
    );
  });
};

module.exports = usersAuth;
