const router = require('koa-router')();
const {register, login, update, getUserByType, getUserInfoById} = require('../controller/userController')
const {getSocketByUserId} = require('../controller/socketController')
const {getDiseases, createChat, getChatListByDocId, getChatListByPatientId, getChatInfoByChatId} = require('../controller/chatController')
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
  .post('/getUserInfoById', getUserInfoById)  //通过用户id获取用户信息
  .post('/getDiseases', getDiseases)  //获取常见疾病列表
  .post('/createChat', createChat)  //新建问诊
  .post('/getChatInfoByChatId', getChatInfoByChatId)  //通过问诊id获取问诊信息
  .post('/getChatListByDocId', getChatListByDocId)  //医生端获取问诊列表
  .post('/getChatListByPatientId', getChatListByPatientId)  //患者端获取问诊列表
  .post('/getMsgHistory', getMsgHistory)  //获取服务器端聊天记录

module.exports = router
