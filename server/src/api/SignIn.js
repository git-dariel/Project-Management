const db = require("../config/Connection");
const bcrypt = require("bcrypt");
const session = require("express-session");

// Function to handle user login
const userLogIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  } else {
    // Querying the database to find the user with the provided email
    db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      // If a user with the provided email exists
      else if (result.length > 0) {
        // Comparing the provided password with the hashed password stored in the database
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (err) throw err;
          else if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.status(200).json({ message: "Log in Success" });
          } else {
            res.send({ message: "Sorry, your email or password are wrong." });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    });
  }
};

// check if the user is logged in
const checkLogin = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

module.exports = { userLogIn, checkLogin };
