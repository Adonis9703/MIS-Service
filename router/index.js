const router = require('koa-router')();
const {findRpById, addRp, updateRp} = require('../database/dao/rpDAO')
const {register, login, update, getUserByType} = require('../controller/userController')
const {getSocketByUserId} = require('../controller/socketController')
const {getDiseases} = require('../controller/chatController')

router
  .post('/test', (ctx) => {
    ctx.body = 'success'
  })
  .post('/getSocketByUserId', getSocketByUserId)  //获取Socket 映射
  .post('/update', update)  //用户更新
  .post('/register', register)  //用户注册
  .post('/login', login)  //用户登录
  .post('/getUserByType', getUserByType)  //通过用户类型获取用户列表
  .post('/getDiseases', getDiseases)  //获取常见疾病列表

module.exports = router
