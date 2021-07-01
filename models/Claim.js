const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: String,
  pathToImage: String,
  createdAt: Date,
  updateAt: Date
})

module.exports = model('Claim', schema)