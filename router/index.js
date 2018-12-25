const router = require('koa-router')();
const {findRpById, addRp, updateRp} = require('../database/dao/rpDAO')
const {register, login, update} = require('../controller/userController')
const {getSocketByUserId} = require('../controller/socketController')
router
  .post('/test',  (ctx) => {
    ctx.body = 'success'
  })
  .post('/getSocketByUserId', getSocketByUserId)  //获取Socket 映射
  .post('/update', update)  //用户更新
  .post('/register', register)  //用户注册
  .post('/login', login)  //用户登录

module.exports = router
