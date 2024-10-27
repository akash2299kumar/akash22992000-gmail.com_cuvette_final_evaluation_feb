const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ["high", "moderate", "low"], required: true },
  checklist: {
    type: [
      {
        task: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    required: true,
  },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["backlog", "todo", "inProgress", "done"],
    default: "todo",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Task", taskSchema);
