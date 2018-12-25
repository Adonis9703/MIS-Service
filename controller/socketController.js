const {socketInfo} = require('../database/entity')
const jwt = require('jsonwebtoken')

const getSocketByUserId = async (ctx) => {
  let token = ctx.request.header.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode) => {
    console.log('验证token 获取socket ===> ', err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登录后再操作',
        data: null
      }
    } else {
      await socketInfo.findById(data.userId).then(res => {
        console.log('===> 查询socket 映射 <===')
        ctx.body = {
          success: true,
          message: '请求成功',
          data: res.dataValues
        }
      })
    }
  })
}

const addSocket = async (data, socket) => {
  console.log('===> 用户注册，生成socket映射 <===')
  let param = {
    userId: data.userId,
    socketId: socket.id
  }
  await socketInfo.create(param).then(res => {
    console.log(res.dataValues)
  }, err => {
    console.log(err)
  })
}

module.exports = {
  getSocketByUserId,
  addSocket
}

