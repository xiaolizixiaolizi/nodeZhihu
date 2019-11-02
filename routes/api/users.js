const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const koa_jwt = require('koa-jwt')
const { jwt_key } = require('../../params')
const { find, findById, create, update, del, login, checkOwner,
  listFollowing, follow, unfollow ,listFollower,checkUserExist } = require('../../controllers/user')
// 注意key必须是secret
const auth = koa_jwt({ secret: jwt_key }) //koa-jwt认证

router.get('/', find) //查找所有用户

router.get('/:id', findById) //返回当前用户{}

router.patch('/edit/:id', auth, checkOwner, update) ///返回被修改的对象{} patch更新用户一部分属性 put全部更新

router.post('/add', create)  //返回新建用户{}

router.delete('/:id', auth, checkOwner, del) //删除用户

router.post('/login', login)
// *************************粉丝和偶像***********************
router.put('/following/:id', auth, checkUserExist,follow) //添加我的偶像 id是 偶像id
router.delete('/following/:id', auth, checkUserExist,unfollow) //取消关注

router.get('/:id/following', listFollowing) //查看我的关注者 我的偶像 id是我自己id

router.get('/:id/follower',listFollower) //查看我的粉丝 id是我自己id

module.exports = router
