const express = require("express");
const cors = require("cors");
const SignUp = require("../src/api/SignUp");
const SignIn = require("../src/api/SignIn");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.post("/signup", SignUp);
app.post("/signin", SignIn);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
