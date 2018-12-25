const {rpInfo} = require('../entity')

const findRpById = async (id) => {
  await rpInfo.findById(id).then(res => {
    console.log(res.dataValues)
  }, err => {
    console.log(err)
  })
}

const updateRp = async (data) => {
  await rpInfo.update(data, {where: {rpId: data.rpId}}).then(res => {
    if (res[0] !== 0) {
      console.log(`更新了${res[0]}条数据`)
    } else {
      console.log(`数据没有变化！`)
    }
  })
}

const addRp = async (data) => {
  await rpInfo.create(data).then(res => {
    console.log(res.dataValues)
  }, err => {
    console.log(err)
  })
}

module.exports = {
  findRpById,
  updateRp,
  addRp
}
