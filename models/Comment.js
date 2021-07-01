const { Schema, model } = require('mongoose');

const schema = new Schema({
  text: String,
  status: {
    ref: 'Status',
    type: Schema.Types.ObjectId
  },
  claim: {
    ref: 'Claim',
    type: Schema.Types.ObjectId
  },
  createdAt: Date,
  updateAt: Date
})

module.exports = model('Comment', schema)