const { Schema, model } = require('mongoose')
const topicSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  avatar: { type: String },
  describe: { type: String, required: false, select: false } //列表describe不显示
})
module.exports = model('topic', topicSchema)