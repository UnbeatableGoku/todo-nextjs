const { Schema, model, models } = require('mongoose');

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' },
});

const userTaskSchema = new Schema({
  email: { type: String, required: true, unique: true, ref: 'User' },
  task: { type: [taskSchema], default: [] },
});

const UserTask = models.UserTask || model('UserTask', userTaskSchema);

module.exports = {
  UserTask,
  taskSchema,
};
