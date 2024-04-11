const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  stageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stage',
    required: true,
  },
  name: { type: String, required: true },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  progress: { type: String, required: true },
  weight: { type: Number, required: true },
  startDate: Date,
  endDate: Date,
  actualEndDate: Date,
  aging: Number,
  daysToComplete: Number,
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    required: true,
  },
});

module.exports = mongoose.model('Tasks', taskSchema);
