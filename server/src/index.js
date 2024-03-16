const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db-connection-config.js");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

connectDb();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./config/cors-config.js"));
app.use(require("./config/session-config.js"));

app.use("/api", require("./routes/user-route.js"));
app.use("/api", require("./routes/projects-route.js"));
app.use("/api", require("./routes/project-member-route.js"));

app.use(require("./middleware/error-handler.js"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
