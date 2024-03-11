const mongoose = require("mongoose");
const stageSchema = require("./stage-model")
const taskSchema = require("./tasks-model")

const projectSchema = new mongoose.Schema({
  project_name: { type: String, required: true },
  description: { type: String },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  stages: { type: [stageSchema], required: false },
  tasks: { type: [taskSchema], required: false },
});

module.exports = mongoose.model("Project", projectSchema);
