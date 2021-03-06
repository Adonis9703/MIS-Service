const {user} = require('../database/entity')
const jwt = require('jsonwebtoken')

const getUserInfoById = async (ctx) => {
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
      await user.findAll({
        where: {userId: data.userId},
        attributes: {exclude: ['password']}
      }).then(res => {
        ctx.body = {
          success: true,
          message: '获取用户信息',
          data: res[0].dataValues,
        }
      })
    }
  })
}

const getDoctorList = async (ctx) => {
  let token = ctx.request.headers.token
  let data = ctx.request.body
  await jwt.verify(token, 'secret', async (err, decode) => {
    if (err) {
      ctx.body = {
        success: false,
        message: '请登录后再操作',
        data: null
      }
    } else {
      await user.findAndCountAll({
        where: {
          name: {$like: `%${data.name}%`},
          $and: {userType: 1}
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
          message: '获取医生列表',
          data: resTemp
        }
      })
    }
  })
}

const getUserByType = async (ctx) => {
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
      await user.findAll({
        where: {
          userType: data.userType,
          $and: {isOnline: data.isOnline},
          name: {$like: `%${data.name}%`}
        },
        attributes: {exclude: ['password']}
      }).then(res => {
        let resTemp = []
        res.forEach(item => {
          resTemp.push(item.dataValues)
        })
        ctx.body = {
          success: true,
          message: '获取用户列表成功',
          data: resTemp
        }
      })
    }
  })
}

const register = async (ctx) => {
  await user.create(ctx.request.body).then(res => {
    ctx.body = {
      success: true,
      message: '注册成功',
      data: null
    }
  }, err => {
    console.log(`===> 用户注册失败 ${err.errors[0].message} <===`)
    ctx.body = {
      success: false,
      message: '注册失败，学号已注册',
      data: null
    }
  })
}

const login = async (ctx) => {
  await user.findById(ctx.request.body.userId).then(res => {
    console.log('===> 用户请求登录登陆 <===')
    if (res && res.dataValues.password === ctx.request.body.password) {
      const token = jwt.sign({
        userId: res.dataValues.userId,
        userName: res.dataValues.name
      }, 'secret', {expiresIn: '168h'})
      console.log('用户登录成功, 生成Token:', token)
      if (res.dataValues.userType == 2 && ctx.request.body.type == 1) {
        ctx.body = {
          success: true,
          message: '管理员登录成功',
          data: res.dataValues,
          token: token
        }
      } else if (ctx.request.body.type == res.dataValues.userType) {
        ctx.body = {
          success: true,
          message: '用户登录成功',
          data: res.dataValues,
          token: token
        }
      } else {
        ctx.body = {
          success: false,
          message: '用户角色不符',
          data: null
        }
      }
    } else {
      console.log('用户登录失败')
      ctx.body = {
        success: false,
        message: '登录失败，请检查学号密码是否错误',
        data: null
      }
    }
  })
}

const update = async (ctx) => {
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
    } else if (data.userType==0 && decode.userId !== data.userId) {
      ctx.body = {
        success: false,
        message: '账号不允许更改哦',
        data: null
      }
    } else {
      await user.update(data, {
        where: {userId: data.oldId}
      }).then(res => {
        console.log('===> 用户更新信息 <===')
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

module.exports = {
  register,
  login,
  update,
  getUserByType,
  getUserInfoById,
  getDoctorList
}
