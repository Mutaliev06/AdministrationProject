const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    title: String,
    color: String,
  },
  { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);
module.exports = Status;
