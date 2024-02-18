const express = require("express");
const cors = require("cors");
const { usersAuth } = require("../src/api/SignUp");
const { userLogIn, checkLogin } = require("../src/api/SignIn");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:8000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

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

app.post("/signup", usersAuth);
app.post("/signin", userLogIn);
app.get("/signin", checkLogin);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
