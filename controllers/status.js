const Status = require('../models/Status')

const statusControllers = {
  async getStatus (req, res) {
    try {
      const status = await Status.find({})
      res.json(status)
    } catch (e) {
      res.json(e.status)
    }
  },

  async postStatus (req, res) {
    try {
      const status = new Status({
        title: req.body.title,
        color: req.params.color
      })
      await status.save()
      res.json(status)
    } catch (e) {
      res.json(e.message)
    }
  }
}

module.exports = statusControllers;