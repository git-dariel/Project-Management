const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/dbConnectionConfig.js");
const { API_ENDPOINTS } = require("./config/endpointsConfig.js");
const { MSG } = require("./config/commonConfig.js");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

connectDb();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./config/corsConfig.js"));
app.use(require("./config/sessionConfig.js"));

app.use(require("./middleware/conditionalTokenValidation.js"));

app.get(API_ENDPOINTS.MAIN.DEFAULT, (req, res) => res.send(MSG.WELCOME));
app.use("/api", require("./routes/userRoute.js"));
app.use("/api", require("./routes/projectRoute.js"));
app.use("/api", require("./routes/memberRoute.js"));
app.use("/api", require("./routes/stageRoute.js"));

app.use(require("./middleware/errorHandler.js"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
