const {user} = require('../entity')

const findUserById = async userId => {
  await user.findById(userId).then(res => {
    console.log('dao')
    return res.dataValues
  })
}

const updateUser = async data => {
  await user.update(data, {where: {userId: data.userId}}).then(res => {
    if (res[0] !== 0) {
      console.log(`更新了${res[0]}条数据`)
    } else {
      console.log(`数据没有变化！`)
    }
  })
}

const addUser = data => {
  return user.create(data)
}
module.exports = {
  findUserById,
  updateUser,
  addUser
}
