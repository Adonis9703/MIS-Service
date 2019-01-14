const router = require('koa-router')();
const {register, login, update, getUserByType} = require('../controller/userController')
const {getSocketByUserId} = require('../controller/socketController')
const {getDiseases, createChat, getChatReqListByDocId} = require('../controller/chatController')
const {getMsgHistory} = require('../controller/messageController')
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
  .post('/createChat', createChat)  //新建问诊
  .post('/getChatReqListByDocId', getChatReqListByDocId)  //医生端获取问诊请求
  .post('/getMsgHistory', getMsgHistory)  //获取服务器端聊天记录
module.exports = router
