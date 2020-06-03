const mongoose = require("mongoose");
const ToDoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  searchQuery: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date().toISOString().substring(0, 10),
  },
});

module.exports = History = mongoose.model("history", HistorySchema);