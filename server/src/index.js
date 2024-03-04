const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.use("/signup", require("./routes/signup-route.js"));
app.use("/signin", require("./routes/signin-route.js"));
app.use("/group", require("./routes/group-route.js"));

// // endpoints for members
// app.get("/getMembers", getMembers);
// app.post("/addMember", addMember);
// app.patch("/deactivateMember/:groupId/members/:memberId", deactivateMember);
// app.patch("/activateMember/:groupId/members/:memberId", activateMember);

// // endpoints for stages
// app.get("/getStages", getStages);
// app.post("/addStages", addStages);
// app.put("/updateStages/:id", updateStages);
// app.delete("/deleteStages/:id", deleteStages);

// // endpoints for tasks
// app.get("/getTasks", getTasks);
// app.post("/addTasks", addTasks);

// // endpoints for notifications
// app.get("/getNotif", getNotifications);
// app.post("/addNotif", addNotifications);
// app.delete("/deleteNotif/:id", deleteNotifications);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
