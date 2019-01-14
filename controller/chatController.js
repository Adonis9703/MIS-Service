const {chatInfo, diseases} = require('../database/entity')
const jwt = require('jsonwebtoken')

const getDiseases = async (ctx) => {
  let token = ctx.request.header.token
  await jwt.verify(token, 'secret', async (err, decode) => {
    console.log('验证token ===>', err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登陆后再操作',
        data: null
      }
    } else {
      await diseases.findAll().then(res => {
        let resTemp = []
        res.forEach(item => {
          resTemp.push(item.dataValues)
        })
        ctx.body = {
          success: true,
          message: '获取常见疾病列表成功',
          data: resTemp
        }
      })
    }
  })
}

module.exports = {
  getDiseases
}
