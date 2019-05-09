const {msgHistory} = require('../database/entity')
const jwt = require('jsonwebtoken')

const getMsgHistory = async (ctx) => {
  let token = ctx.request.header.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode) => {
    console.log('验证token ===>', err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登录后再操作',
        data: null
      }
    } else {
      await msgHistory.findAll({
        where: {chatId: data.chatId}
      }).then(res => {
        let resTemp = []
        res.forEach(item => {
          resTemp.push(item.dataValues)
        })
        ctx.body = {
          success: true,
          message: '获取消息记录成功',
          data: resTemp
        }
      })
    }
  })
}

const addMsg = async (ctx) => {
  let token = ctx.request.header.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode) => {
    console.log('验证token ===>', err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登陆后再操作',
        data: null
      }
    } else {
      await msgHistory.create(data).then(res => {
        console.log(res.dataValues)
        ctx.body = {
          success: true,
          message: '新增消息记录成功',
          data: null
        }
      })
    }
  })
}

const uploadFile = (ctx) => {
  let data = ctx.req.body
  ctx.body = {
    success: true,
    message: 'uploaded',
    data: {
      name: ctx.req.file.filename,
      data: data
    }
  }
}

module.exports = {
  getMsgHistory,
  addMsg,
  uploadFile
}
