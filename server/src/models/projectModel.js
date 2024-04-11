const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: { type: String },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      isActive: { type: Boolean, default: true },
    },
  ],
  startDate: Date,
  endDate: Date,
  stages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stage' }],
  projectItemCounter: { type: Number, default: 1 },
});

projectSchema.set('autoIndex', true);

projectSchema.methods.addMember = async function (userId) {
  const isMemberAlready = this.members.some((member) => member.userId.equals(userId));
  if (isMemberAlready) {
    throw new Error('Member already exists in the project');
  }
  this.members.push({ userId: userId, isActive: true });
  await this.save();
};

module.exports = mongoose.model('Project', projectSchema);
