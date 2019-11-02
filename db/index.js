// 连接数据库
const mongoose = require('mongoose')
const { DB_URL } = require('../params')
module.exports = new Promise((resolve, reject) => {
  // 连接数据库异步代码
  mongoose.set(`useFindAndModify`,false)
  mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true ,})
  mongoose.connection.on('open', err => {
    if (err) {
      return reject(err)
    }
    console.log('数据库连接成功')
    resolve()
  })
})
