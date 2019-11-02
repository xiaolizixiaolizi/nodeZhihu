const indexModel = require('../model/qunaer/indexModel')
const cityModel = require('../model/qunaer/cityModel')
const detailModel = require('../model/qunaer/detailModel')
class Qunaer {
  // 获取首页数据
  async findHome(ctx) {
    ctx.body = await indexModel.find({})
  }
  // 获取city
  async findCity(ctx) {
    ctx.body = await cityModel.find({})
  }
  // 获取详情
  async findDetail(ctx) {
    ctx.body = await detailModel.find({})
  }
}
module.exports = new Qunaer()