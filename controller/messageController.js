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
        console.log(res)
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

module.exports = {
  getMsgHistory
}
