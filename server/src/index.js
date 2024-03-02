const express = require("express");
const cors = require("cors");
const { usersAuth } = require("../src/api/SignUp");
const { userLogIn, checkLogin, getUsers } = require("../src/api/SignIn");
const {
  addGroups,
  updateGroups,
  deleteGroup,
  getGroups,
} = require("./api/Groups.js");
const {
  addStages,
  updateStages,
  deleteStages,
  getStages,
} = require("./api/Stages.js");
const {
  deactivateMember,
  addMember,
  getMembers,
  activateMember,
} = require("./api/Members.js");
const { addTasks, getTasks } = require("./api/Tasks.js");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const {
  addNotifications,
  deleteNotifications,
  getNotifications,
} = require("./api/Notification.js");

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
app.get("/getUsers", getUsers);

// endpoints for groups
app.get("/getGroups", getGroups);
app.post("/addGroups", addGroups);
app.put("/updateGroups/:id", updateGroups);
app.delete("/deleteGroup/:id", deleteGroup);

// endpoints for members
app.get("/getMembers", getMembers);
app.post("/addMember", addMember);
app.patch("/deactivateMember/:groupId/members/:memberId", deactivateMember);
app.patch("/activateMember/:groupId/members/:memberId", activateMember);

// endpoints for stages
app.get("/getStages", getStages);
app.post("/addStages", addStages);
app.put("/updateStages/:id", updateStages);
app.delete("/deleteStages/:id", deleteStages);

// endpoints for tasks
app.get("/getTasks", getTasks);
app.post("/addTasks", addTasks);

// endpoints for notifications
app.get("/getNotif", getNotifications);
app.post("/addNotif", addNotifications);
app.delete("/deleteNotif/:id", deleteNotifications);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
