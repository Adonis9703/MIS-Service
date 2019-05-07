const {rpInfo} = require('../database/entity')
const jwt = require('jsonwebtoken')

const getRpByChatId = async (ctx) => {
  let token = ctx.request.header.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode) => {
    console.log('rpController 验证token ===>', err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登陆后再操作',
        data: null
      }
    } else {
      await rpInfo.findAll({
        where: {chatId: data.chatId},
      }).then(res => {
        ctx.body = {
          success: true,
          message: '获取处方信息',
          data: res[0].dataValues
        }
      })
    }
  })
}

const createRp = async ctx => {
  await rpInfo.create(ctx.request.body).then(res => {
    ctx.body = {
      success: true,
      message: '开具处方成功',
      data: null
    }
  })
}

module.exports = {
  getRpByChatId,
  createRp
}
