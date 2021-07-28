const Status = require("../models/Status.model");

const statusControllers = {
  async getStatus(req, res) {
    try {
      const status = await Status.find({});
      res.json(status);
    } catch (e) {
      res.json(e.status);
    }
  },

  async postStatus(req, res) {
    const { title, color } = req.body
    try {
      const status = await Status.create({
        title,
        color
      });
      await status.save();
      res.json(status);
    } catch (e) {
      res.json(e.message);
    }
  },
};

module.exports = statusControllers;
