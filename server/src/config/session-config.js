const session = require("express-session");

const sessionConfig = {
  key: "user_id",
  secret: "qwerty",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
};

module.exports = session(sessionConfig);
