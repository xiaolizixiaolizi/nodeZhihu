# 补充

## 剩余参数删除对象某几项

```js
let obj = { name: 'zs', age: 10, gender: 'male' ,_v:104545}
let {_v,...rest}=obj
console.log(rest) //{ name: 'zs', age: 10, gender: 'male' }
```

## 对象解构赋默认值

```js
let { name='' } = {  age: 10 }
console.log(name) 避免出现undedified
```



```js
const Koa = require('koa')
const Router=require('koa-router')
const app = new Koa()
const testRouter=new Router({prefix:'/test'})

 // 注册路由
 app.use(testRouter.routes())
```

## path

```js
const path=require('path')
let res=path.join(__dirname,'params.js') //E:\00jinxun\code\node1\zhifu-api\params.js
let res1=path.basename(res)  //params.js
```



## restful



## koa中间件



```js
// 中间键本质是一个函数
const auth=async(ctx,next)=>{
  console.log(ctx.url) // /test?name=zs&age=10
  console.log(ctx.path) // /test
  if(ctx.path!=='/test'){
    ctx.throw(401,'没有授权')
  }
  await next()
}


const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jwt.verify(token, jwt_key)
    ctx.state.user = user
    console.log(ctx.state)

  } catch (error) {
    ctx.throw(401, error.message)
  }
  // 自我验证
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(403, '没有权限')
  }
  await next()
}
```

## ctx对象参数

```js
http://localhost:3000/test?name=zs&age=10
console.log(ctx.url) // /test?name=zs&age=10
console.log(ctx.path) // /test
console.log(ctx.query) //{ name: 'zs', age: '10' }
console.log(ctx.request.body) //{ name: 'li', age: 10, gender: 'male' }post参数koa-bodyparser

http://localhost:3000/test/454eret6515/100
console.log(ctx.params) //{ id: '454eret6515', page: '100' } get/post/put都有params 

配置
testRouter.post('/:id/:page',auth,ctx=>{
    console.log(ctx.url) // /test/454eret6515/100
    console.log(ctx.params) //{ id: '454eret6515', page: '100' }
    ctx.body=ctx.params
})
```

## restful返回值和状态码

### 204请求成功，但是不不返回任何响应

```js
testRouter.get('/',ctx=>{
     
      ctx.body='获取用户列表' //返回所以用户列表[{},{}...]
    })

    testRouter.get('/:id',ctx=>{
      ctx.body=`获取特定用户${ctx.params.id}` //返回当前用户{}
    })
    testRouter.post('/add',ctx=>{
      ctx.body='新建用户' //返回新建用户{}
    })
    testRouter.put('/:id',ctx=>{
      ctx.body='修改用户' //返回被修改的对象{}
    })
    testRouter.delete('/:id',ctx=>{
      ctx.status=204 //删除成功，但是不返回任何内容
     
    })
```

## route&&controllers文件夹

![1571647381945](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1571647381945.png)



```js
controllers/user.js
const UserModel = require('../model/User')
class UserCtl {
  async find(ctx) {  //返回所以用户列表[{},{}...]
    ctx.body = await UserModel.find({})
  }
  async findById(ctx) { //返回当前用户{}
    let user = await UserModel.findById(ctx.params.id, { name: 1, _id: 0 })
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }
  async create(ctx) { //新建用户 返回当前新用户
    ctx.verifyParams({
      name: { type: 'string', required: true },
      age: { type: 'number', required: true }
    })
    // 拿到ctx.request.body检验过的对象
    ctx.body = await UserModel.create(ctx.request.body)
  }
  async update(ctx) { //返回被修改(更新)的对象{}
    ctx.verifyParams({
      name: { type: 'string', required: true }
    })
    // (id,update,option={new:false}) 默认是false,返回原始数据。new返回修改后的数据
    let user = await UserModel.findByIdAndUpdate(ctx.params.id, ctx.request.body,{new:true})
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }
  async del(ctx) {
    let user = await UserModel.findByIdAndDelete(ctx.params.id)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.status = 204 //删除用户成功，但是不返回任何内容

  }

}
module.exports = new UserCtl()

```



## 错误处理

防止程序挂掉

方便代码调试

告诉用户错误信息

### 状态码

204请求成功，但是不不返回任何响应

404 客户端资源为找到



### koa自带错误处理

ctx.throw(状态码，’message')

404错误返回Not Found



### 错误处理中间件npm i koa-json-error -S



## koa-parameter参数检验

```js
 app.use(bodyParser()) //post参数解析
app.use(parameter(app)) //参数检验
放在注册路由之上
```



```js
ctx.verifyParams({
    name: { type: 'string', required: true },
    age: { type: 'number', required: true }
})
```



## jwt(JSON-WEB-TOKEN）



各方信息作为json对象进行传递。该json经过编码成一段看不懂的字符串传输。

该信息可以验证和信任，因为经过数字签名。

jwt构成 **header(头部)+payload（信息）+sign（数字签名）**

header: **type*:token的类型固定为jwt ,**alg**使用hash算法。{"alg"}:"HS256","typ":"jwt"}

payload:传递的信息和过期时间等{user:'zs',id:100}

sgin：secret.

### jwt工作原理

用户登录成功数据用户名和密码，后台返回一个token字符串结果。

前端保存token到localstroage.

前端下次**请求头部**从localstroage取出token发送请求。

签名算法：jwt.sign(自定义规则，加密名字如'secret'，{过期时间s 3600*10}可选，箭头函数可选) 

验证算法：jwt.verify(token，jwt_key)

```js
const jwt=require('jsonwebtoken')
let {jwt_key}=require('./params') //'secret'
let rule={name:'zs',age:10,id:1001}
// jwt.sign(自定义规则，加密名字如'secret'，{过期时间s 3600*10}可选，箭头函数可选)
let token=jwt.sign(rule,jwt_key) //签名算法

let res1=jwt.verify(token,jwt_key) //验证算法 { name: 'zs', age: 10, id: 1001, iat: 1571707314 }
let res=jwt.decode(token) //也可以解密token但是不安全 { name: 'zs', age: 10, id: 1001, iat: 1571707314 }
console.log(res,res1)
```



## koa-jwt用户认证和授权

## 上传图片koa-body

安装koa-body替换koa-bodyparser.(仅仅支持application/json/application/x-www-form-urlencoded)不支持文件上传。

而koa-body支持application/json/application/x-www-form-urlencoded。也支持文件。

![1571730198464](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1571730198464.png)

## koa-static生成图片链接



![1571734530231](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1571734530231.png)



## 通过查询字符串显示隐藏字段

?fields=a;b;c 其中a b c是在schema中隐藏的字段 select:false

```js
let user = await UserModel.findById(ctx.params.id).select('+locations +employments +educations')

```



## 关注人following和粉丝follower

关注人:表示我关注了其他人。重点列出我的所有关注对象 大白话：我的偶像

粉丝：表示其他人关注了我。列出关注我的所有对象 大白话：我的粉丝



## 话题需求

话题增该查

分页。模糊查询

用户属性中话题引用

关注和取消关注话题，用户关注的话题列表。



