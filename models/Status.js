const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: String,
  color: String,
  createdAt: Date,
  updateAt: Date
})

module.exports = model('Status', schema)