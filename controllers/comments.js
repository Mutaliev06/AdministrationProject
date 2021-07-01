const Comment = require('../models/Comment')

const commentController =  {
  async getComments (req, res) {
    try {
      const comment = await Comment.find({
        claim: req.params.id
      })
      res.json(comment)
    } catch (e) {
      res.json(e.message)
    }
  },

  async postComment (req, res) {
    try {
      const comment = new Comment({
        text: req.body.text,
        status: req.body.status,
        claim: req.params.id
      })
      await comment.save()
      res.json(comment)
    } catch (e) {
      res.json(e.message)
    }
  },

  async patchComment (req, res) {
    try {
      const { id } = req.params;
      const { text } = req.body
      const comment = await Comment.findByIdAndUpdate(id,
        { text },
        {new: true})
      res.json(comment);
    } catch (e) {
      res.json(e.message)
    }
  }
}

module.exports = commentController;