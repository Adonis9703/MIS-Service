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

const createChat = async (ctx) => {
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
      await chatInfo.create(data).then(res => {
        console.log('chatController.js 新建问诊', res.dataValues)
        ctx.body = {
          success: true,
          message: '新建问诊成功',
          data: null
        }
      })
    }
  })
}

const getChatInfoByChatId = async (ctx) => {
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
      await chatInfo.findById(data.chatId).then(res => {
        ctx.body = {
          success: true,
          message: '获取问诊信息',
          data: res.dataValues,
        }
      })
    }
  })
}

const getChatListByDocId = async (ctx) => {
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
      await chatInfo.findAll({
        where: {doctorId: data.doctorId}
      }).then(res => {
        let resTemp = []
        res.forEach(item => {
          resTemp.push(item.dataValues)
        })
        ctx.body = {
          success: true,
          message: '获取问诊请求列表成功',
          data: resTemp
        }
      })
    }
  })
}

const getChatListByPatientId  = async (ctx) => {
  let token = ctx.request.header.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode)=> {
    console.log('验证token ===>', err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登陆后再操作',
        data: null
      }
    } else {
      await chatInfo.findAll({
        where: {patientId: data.patientId}
      }).then(res => {
        let resTemp = []
        res.forEach(item => {
          resTemp.push(item.dataValues)
        })
        ctx.body = {
          success: true,
          message: '获取问诊请求列表成功',
          data: resTemp
        }
      })
    }
  })
}

module.exports = {
  getDiseases,
  createChat,
  getChatListByDocId,
  getChatListByPatientId,
  getChatInfoByChatId
}
