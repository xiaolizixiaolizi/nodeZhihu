
const { Schema, model } = require('mongoose')
const userSchema = new Schema({
  __v: { type: Number, select: false }, //返回结果不显示该字段
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar: { type: String },
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: true },
  headLine: { type: String },
  locations: { //字符串数组 居住地
    select: false,
    type: [{
      type: String
    }]
  },
  employments: { //职业
    select: false,
    type: [
      {
        company: { type: String },
        job: { type: String }
      }
    ]
  },
  educations: { //教育
    select: false,
    type: [
      {
        school: { type: String },
        major: { type: String },
        diploma: { type: Number, required: true, enum: [1, 2, 3, 4, 5] }, //学历用1 2 3 4 5代表各个学历
        entranceYear: { type: Number },
        graduationYear: { type: Number }
      }
    ]
  },
  // 我的偶像 我关注的所有对象对象数组 关注对象不可能有上千万 ["5daec921324db434c4af030e","5daea3429aa59432fcf6ada3"]
  following: {
    select: false,
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }]
  }
  // 没有列出我的分析followers.因为粉丝可能有上千万



})

module.exports = model('users', userSchema)