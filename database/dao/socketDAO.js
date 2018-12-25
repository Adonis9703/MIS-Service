const {socketInfo} = require('../entity')

const findSocketIdByUserId = async (userId) => {
  await socketInfo.findAll({
    where: {userId: userId}
  }).then(res => {
    console.log(res[0].dataValues)
  })
}

const updateSoket = async (data) => {
  await socketInfo.update(data, {
    where: {
      userId: data.userId
    }
  }).then(res => {
    if (res[0] !== 0) {
      console.log(`更新了${res[0]}条数据`)
    } else {
      console.log(`数据没有变化！`)
    }
  })
}

const addSocket = async (data) => {
  await socketInfo.create(data).then(res => {
    console.log(res.dataValues)
  }, err => {
    console.log(err)
  })
}
module.exports = {
  findSocketIdByUserId,
  updateSoket,
  addSocket
}
