const Comment = require("../models/Comment.model");

const commentController = {
  async getComments(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.find({
        claim: id,
      });
      res.json(comment);
    } catch (e) {
      res.json(e.message);
    }
  },

  async postComment(req, res) {
    const { text, status } = req.body;
    const { id } = req.params;

    if (text.length < 5) {
      return res.json({
        error:
          "Слишком короткий комментарий. Длина комментария должна быть больше 5 символов.",
      });
    }

    try {
      const comment = await Comment.create({
        text,
        status,
        claim: id,
      });
      res.json(comment);
    } catch (e) {
      res.json(e.message);
    }
  },

  async patchComment(req, res) {
    try {
      const { id } = req.params;
      const { text, status } = req.body;
      const comment = await Comment.findByIdAndUpdate(
        id,
        { text, status },
        { new: true }
      );
      res.json(comment);
    } catch (e) {
      res.json(e.message);
    }
  },
};

module.exports = commentController;
