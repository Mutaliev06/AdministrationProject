const Claim = require('../models/Claim')

const claimController =  {
  async getClaim (req, res) {
    try {
      const claim = await Claim.find()
      res.json(claim)
    } catch (e) {
      res.json(e.message)
    }
  },

  async postClaim (req, res) {
    try {
      const claim = await new Claim({
        title: req.body.title,
        pathToImage: req.body.pathToImage
      })
      await claim.save()
      res.json(claim)
    } catch (e) {
      res.json(e.message)
    }
  },

  async deleteClaim (req, res) {
    try {
      const claim = new Claim.findByIdAndDelete({
        id: req.params.id
      })
      res.json(claim)
    } catch (e) {
      res.json(e.message)
    }
  }
}

module.exports = claimController;