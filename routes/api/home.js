const Router = require('koa-router')
const router = new Router()
const {index,upload}=require('../../controllers/home')


// router.get('/',ctx=>{
//   index(ctx)
// })
// 更简化
router.get('/',index)

router.post('/upload',upload)
module.exports=router