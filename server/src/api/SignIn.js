const db = require("../config/Connection");
const bcrypt = require("bcrypt");

// Function to handle user login
const userLogIn = (req, res) => {
  //Extracting email and password from the body of client side
  const email = req.body.email;
  const password = req.body.password;

  // Querying the database to find the user with the provided email
  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    // Sending error if there's a database error
    if (err) {
      res.send({ err: err });
    }

    // If a user with the provided email exists
    if (result.length > 0) {
      // Comparing the provided password with the hashed password stored in the database
      bcrypt.compare(password, result[0].password, (err, response) => {
        // error handling
        if (err) throw err;
        // Sending user data if password matches
        else if (response) {
          res.send(result);
        } else {
          res.send({ message: "Wrong password combination." });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
};

module.exports = userLogIn;
