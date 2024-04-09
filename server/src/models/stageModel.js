const mongoose = require('mongoose')

const stageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
})

module.exports = mongoose.model('Stage', stageSchema)
