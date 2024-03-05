const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PORT = process.env.PORT || 8000;
const app = express();

require("dotenv").config();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(
  session({
    key: "user_id",
    secret: "qwerty",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use("/api", require("./routes/signup-route.js"));
app.use("/api", require("./routes/signin-route.js"));
app.use("/api", require("./routes/group-route.js"));
app.use("/api", require("./routes/member-route.js"));
app.use("/api", require("./routes/stage-route.js"));
app.use("/api", require("./routes/task-route.js"));
app.use("/api", require("./routes/notification-route.js"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
