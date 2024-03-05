const express = require("express");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8000;
const app = express();

require("dotenv").config();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./config/cors-config.js"));
app.use(require("./config/session-config.js"));

app.use("/api", require("./routes/users/signup-route.js"));
app.use("/api", require("./routes/users/signin-route.js"));
app.use("/api", require("./routes/admin/group-route.js"));
app.use("/api", require("./routes/admin/member-route.js"));
app.use("/api", require("./routes/admin/stage-route.js"));
app.use("/api", require("./routes/admin/task-route.js"));
app.use("/api", require("./routes/admin/notification-route.js"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
