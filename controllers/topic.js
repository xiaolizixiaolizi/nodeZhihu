const TopicModel = require('../model/Topic')
const { isEmpty } = require('../common/utils')

class TopicCtl {
  // 获取所有话题列表 查
  async find(ctx) {
    ctx.body = await TopicModel.find({})
  }
  // 获取某一个列表 传入列表id 查
  async findById(ctx) {
    let fields = ctx.query.fields
    let fieldsSel = isEmpty(fields) || fields == ';' ? '' : fields.split(';').map(e => ` +${e}`).join('')
    let topic = await TopicModel.findById(ctx.params.id).select(fieldsSel)
    if (isEmpty(topic)) ctx.throw(404, '话题不存在')
    ctx.body = topic
  }

  // 创建一个话题 增
  async create(ctx) {
    // 参数检验
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar: { type: 'string', required: false },
      describe: { type: 'string', required: false, } //列表describe不显示
    })
    // 获取请求体参数
    let { name, avatar, describe } = ctx.request.body
    // 检验话题唯一性
    let topic = await TopicModel.findOne({ name })
    if (!isEmpty(topic)) ctx.throw(409, '该话题已存在')
    // 将新话题保存在数据库
    ctx.body = await TopicModel.create(ctx.request.body)

  }
  // 更新topic
  async update(ctx) {
    // 参数检验
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar: { type: 'string', required: false },
      describe: { type: 'string', required: false, } //列表describe不显示
    })
    // 检验修改后的name是否和别的topic重复
    let { name = '' } = ctx.request.body
    let topic1 = await TopicModel.findOne({ name })
    if (!isEmpty(topic1)) {
      ctx.throw(409, '不能和其他topic重名')
    }
    // 更新 传了id就要检验该id是否存在
    let topic = await TopicModel.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true })
    if (isEmpty(topic)) ctx.throw(404, '该话题不存在')

    ctx.body = topic
  }
  // 
}
module.exports = new TopicCtl()