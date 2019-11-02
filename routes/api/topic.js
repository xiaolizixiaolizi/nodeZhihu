const Router = require('koa-router')
const router = new Router({ prefix: '/topic' })
const koa_jwt = require('koa-jwt')
const { jwt_key } = require('../../params')
const { find, findById, create, update } = require('../../controllers/topic')
const auth = koa_jwt({ secret: jwt_key })

// 查所有topic
router.get('/', find)
// 查特定topic
router.get('/:id', findById)
// 增加topic
router.post('/add', auth,create)
//局部更新话题
router.patch('/edit/:id',auth, update)
module.exports = router