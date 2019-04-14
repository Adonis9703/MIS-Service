const {medicine} = require('../database/entity')
const jwt = require('jsonwebtoken')
const Sq = require('sequelize')

const getMedInfoById = async (ctx) => {
  let token = ctx.request.headers.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode) => {
    console.log(`===> medicineController.js 验证token`, err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登录后再操作',
        data: null
      }
    } else {
      await medicine.findById(data.id).then(res => {
        ctx.body = {
          success: true,
          message: '获取药品信息',
          data: res.dataValues
        }
      })
    }
  })
}

const getMedInfoList = async (ctx) => {
  let token = ctx.request.headers.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode) => {
    console.log(`===> medicineController.js 验证token`, err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登录后再操作',
        data: null
      }
    } else {
      await medicine.findAndCountAll({
        where: {
          name: {$like: `%${data.name}%`},
          $and: {isDelete: false}
          },
        limit: data.pageSize,
        offset: (data.pageSize * (data.pageNo - 1))
      }).then(res => {
        let temp = []
        res.rows.forEach(item => {
          temp.push(item.dataValues)
        })
        let resTemp = {
          list: temp,
          total: res.count
        }
        ctx.body = {
          success: true,
          message: '获取药品列表',
          data: resTemp
        }
      })
    }
  })
}

const updateMedInfo = async (ctx) => {
  let token = ctx.request.headers.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode) => {
    console.log(`===> medicineController.js 验证token`, err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登录后再操作',
        data: null
      }
    } else {
      await medicine.update(data, {
        where: {id: data.id}
      }).then(res => {
        console.log('===> medicineController.js 更新药品信息')
        console.log(res)
        ctx.body = {
          success: true,
          message: '修改成功',
          data: null
        }
      })
    }
  })
}

const addMedInfo = async (ctx) => {
  let token = ctx.request.headers.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode) => {
    console.log(`===> medicineController.js 验证token`, err, decode)
    if (err) {
      ctx.body = {
        success: false,
        message: '请登录后再操作',
        data: null
      }
    } else {
      await medicine.create(ctx.request.body).then(res => {
        ctx.body = {
          success: true,
          message: '新增药品成功',
          data: null
        }
      })
    }
  })
}

module.exports = {
  addMedInfo,
  updateMedInfo,
  getMedInfoById,
  getMedInfoList
}
