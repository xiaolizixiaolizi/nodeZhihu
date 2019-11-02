// 批量注册路由到app上脚本
const fs = require('fs')
let routeFile = fs.readdirSync(__dirname).filter(e => e !== 'index.js') //[ 'home.js', 'users.js' ]
module.exports = (app) => {
  routeFile.forEach(file => {
    let router = require('./' + file) //暴露出导出的router
    app.use(router.routes()).use(router.allowedMethods())
  })
}
