const express = require("express");
const cors = require("cors");
const { usersAuth } = require("../src/api/SignUp");
const { userLogIn, checkLogin } = require("../src/api/SignIn");
const {
  addGroups,
  updateGroups,
  deleteGroup,
  getGroups,
} = require("./api/Groups.js");
const { addStages, addTasks } = require("./api/Stages.js");
const { deleteMember, addMember, getMembers } = require("./api/Members.js");
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

// endpoints for sign in and sign up
app.post("/signup", usersAuth);
app.post("/signin", userLogIn);
app.get("/signin", checkLogin);

// endpoints for groups
app.get("/getGroups", getGroups);
app.post("/addGroups", addGroups);
app.put("/updateGroups/:id", updateGroups);
app.delete("/deleteGroup/:id", deleteGroup);

// endpoints for members
app.get("/getMembers", getMembers);
app.post("/addMember", addMember);
app.delete("/deleteMember/:groupId/members/:memberId", deleteMember);

// endpoints for stages and tasks
app.post("/addStages", addStages);
app.post("/addTasks", addTasks);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
