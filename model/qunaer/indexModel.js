const { Schema, model } = require('mongoose')
const indexSchema = new Schema({
  swiperList: [
    {
      id: {
        type: String
      },
      imgUrl: {
        type: String
      }
    }
  ],
  iconList: [{
    id: { type: String },
    imgUrl: { type: String },
    desc: { type: String }

  }],
  recommendList: [
    {
      id: { type: String },
      imgUrl: { type: String },
      desc: { type: String },
      title: { type: String }
    }
  ],
  "__v":{type:Number,select:false}
})
module.exports = model('quIndex', indexSchema)