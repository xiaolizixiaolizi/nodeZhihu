const Router = require('koa-router')
const router = new Router({ prefix: '/qunaer' })

const { findHome, findCity, findDetail } = require('../../controllers/qunaer')
// console.log(findHome,findCity)
// 查home
router.get('/', findHome)
// city列表信息
router.get('/city', findCity)
// 详情页
router.get('/detail', findDetail)
module.exports = router