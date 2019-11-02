const UserModel = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isEmpty } = require('../common/utils')

const { jwt_key } = require('../params')
class UserCtl {
  async find(ctx) {  //返回所以用户列表[{},{}...]
    ctx.body = await UserModel.find({})
  }

  async findById(ctx) { //返回当前用户{}
    let fieldsQuery = ctx.query.fields //如果不传field  fields是unddelf
    let fields = isEmpty(fieldsQuery) || fieldsQuery === ';' ? '' :
      (fieldsQuery.split(';').map(e => ` +${e}`).join(''))
    // console.log(fields) // +employments +educations
    let user = await UserModel.findById(ctx.params.id).select(fields)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }
  async create(ctx) { //新建用户 返回当前新用户
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    let { name, password } = ctx.request.body
    let user = await UserModel.findOne({ name })
    if (user) ctx.throw(409, '该用户名已被占用') //保证用户名唯一性
    // 密码加密
    ctx.request.body.password = await bcrypt.hash(password, 10)
    ctx.body = await UserModel.create(ctx.request.body)

  }
  async update(ctx) { //返回被修改(更新)的对象{}
    // 参数检验
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avatar: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      headLine: { type: 'string', required: false },
      locations: { type: 'array', required: false, itemType: 'string' },
      employments: { type: 'array', required: false, itemType: 'object' },
      educations: { type: 'array', required: false, itemType: 'object' },
    })
    // (id,update,option={new:false}) 默认是false,返回原始数据。new返回修改后的数据
    let user = await UserModel.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true })
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }
  async del(ctx) {
    let user = await UserModel.findByIdAndDelete(ctx.params.id)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.status = 204 //删除用户成功，但是不返回任何内容

  }
  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    let { name, password } = ctx.request.body
    // 验证用户名是否存在
    let user = await UserModel.findOne({ name }).select('+password') //默认user不带password要带上password
    if (!user) ctx.throw(401, '该用户名不存在，请立即注册') //未授权401
    // 如果存在用户验证密码
    let isMatch = await bcrypt.compare(password, user.password) //明文,暗文
    if (!isMatch) ctx.throw(401, '您输入的密码错误，请重新输入')  //未授权401
    // 用户存在并且密码正确就返回用户token
    let rule = { _id: user._id, name } //放入不敏感信息 这里最好把_id放进去，后面验证有用
    // console.log(rule)
    let token = jwt.sign(rule, jwt_key, { expiresIn: 3600 * 10 })
    ctx.body = { token: `Bearer ${token}` }
  }
  // 自我认证中间件
  async checkOwner(ctx, next) {
    // console.log(ctx.state)
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有操作权限')
    }
    await next()
  }

  // ***********************************关注和粉丝***********************************

  //我在关注和取消关注这个user之前，要先判断这个user是否存在

  async checkUserExist(ctx, next) {
    let user = await UserModel.findById(ctx.params.id)
    if (isEmpty(user)) ctx.throw(404, '该用户不存在')
    await next()
  }
  // 查看我的关注对象偶像
  async listFollowing(ctx) {
    // 获取我 id是我的id
    let me = await UserModel.findById(ctx.params.id).select(`+following`).populate('following')
    if (isEmpty(me)) ctx.throw(404,'用户不存在')
    ctx.body = me.following//不加上populate('users') 返回关注者id.加了返回更详细信息

  }
  //添加（关注）我的偶像 登陆态
  async follow(ctx) {
    let me = await UserModel.findById(ctx.state.user._id).select('+following')
    if (!me.following.map(e => e.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id) //修改了me的数据所以要save push改变源数组
      me.save() //很关键 一定要save
    }
    ctx.status = 204
  }
  // 取消关注 登录态
  async unfollow(ctx) {
    let me = await UserModel.findById(ctx.state.user._id).select('+following')
    me.following = me.following.map(e => e.toString()).filter(e => e !== ctx.params.id) //filter原数组不变
    me.save()
    ctx.status = 204
  }
  // 查看粉丝 id是我的id. 查询数据库所有数据，加一个限定条件 following的id包含me的id
  async listFollower(ctx) {
    let follower = await UserModel.find({ following: ctx.params.id }) //返回一个[{},{}]
    ctx.body = follower
  }





}
module.exports = new UserCtl()
