const path = require('path')
class HomeCtl {
  index(ctx) {
    ctx.body = '这是首页'

  }
  upload(ctx) {
    // console.log(ctx.request.files.file)
    const file = ctx.request.files.file //本地上传的决定路径
    const basename = path.basename(file.path)

    ctx.body = {
      url: `${ctx.origin}/uploads/${basename}`
    }

  }
}
module.exports = new HomeCtl()