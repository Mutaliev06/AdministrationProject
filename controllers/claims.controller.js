const Claim = require("../models/Claim.model");

const claimController = {
  async getClaim(req, res) {
    try {
      const claim = await Claim.aggregate([
        {
          $lookup: {
            from: "comments",
            as: "comments",
            let: { claim: "$_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$claim", "$$claim"] } } }],
          },
        },
        {
          $lookup: {
            from: "comments",
            as: "lastComment",
            let: { claim: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$claim", "$$claim"] } } },
              { $sort: { createdAt: -1 } },
              { $limit: 1 },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            pathToImage: 1,
            comments: 1,
            lastComment: 1
          },
        },
        { $unwind: { path: "$lastComment", preserveNullAndEmptyArrays: true } },
      ]);

      res.json(claim);
    } catch (e) {
      res.json(e.message);
    }
  },

  async postClaim(req, res) {
    const { title, pathToImage } = req.body
    try {
      const claim = await new Claim({
        title,
        pathToImage
      });
      await claim.save();
      res.json(claim);
    } catch (e) {
      res.json(e.message);
    }
  },

  async deleteClaim(req, res) {
    const { id } = req.params
    try {
      const claim = await Claim.findByIdAndDelete(id);
      res.json(claim);
    } catch (e) {
      res.json(e.message);
    }
  },
};

module.exports = claimController;
