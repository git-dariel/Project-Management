// const db = require("../../database/db-connection");
// const bcrypt = require("bcrypt");

// const saltRounds = 10;

// const usersAuth = (req, res) => {
//   const { firstname, lastname, position, email, password } = req.body;

//   console.log("req.body:", req.body);

//   if (!password || !email || !firstname || !lastname || !position) {
//     res.status(500);
//     throw new Error("Missing required fields");
//   }

//   db.query(
//     "SELECT * FROM users WHERE email = ?",
//     [email],
//     (selectErr, selectResult) => {
//       if (selectErr) {
//         console.error("Error checking existing user:", selectErr);
//         return res
//           .status(500)
//           .json({ message: "Error checking existing user" });
//       } else if (selectResult.length > 0) {
//         return res.status(409).json({ message: "User already exists" });
//       } else {
//         bcrypt.hash(password, saltRounds, (hashErr, hash) => {
//           if (hashErr) {
//             console.error("Error hashing password:", hashErr);
//             return res.status(500).json({ message: "Error hashing password" });
//           }

//           db.query(
//             "INSERT INTO users (firstname, lastname, position, email, password) VALUES (?, ?, ?, ?, ?)",
//             [firstname, lastname, position, email, hash],
//             (insertErr, result) => {
//               if (insertErr) {
//                 console.error(
//                   "Error inserting user into the database:",
//                   insertErr
//                 );
//                 return res
//                   .status(500)
//                   .json({ message: "Error registering user" });
//               }
//               res.json({ message: "User registered successfully" });
//             }
//           );
//         });
//       }
//     }
//   );
// };

// const getUsers = (req, res) => {
//   db.query("SELECT * FROM users", (err, result) => {
//     if (err) {
//       res.send({ err: err });
//     } else {
//       res.send({ message: "Users successfully retrieved", data: result });
//     }
//   });
// };

// module.exports = { usersAuth, getUsers };
