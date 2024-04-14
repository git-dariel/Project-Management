const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model('Stage', stageSchema);
