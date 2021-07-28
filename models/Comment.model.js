const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: String,
    status: {
      ref: "Status",
      type: mongoose.Schema.Types.ObjectId,
    },
    claim: {
      ref: "Claim",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
