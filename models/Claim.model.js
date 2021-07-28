const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    title: String,
    pathToImage: String,
    comment: {
      ref: "Comment",
      type: mongoose.Schema.Types.ObjectId,
    }
  },
  { timestamps: true }
);

const Claim = mongoose.model("Claim", claimSchema);
module.exports = Claim;
