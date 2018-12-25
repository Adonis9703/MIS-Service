const {medicine} = require('../entity')

const findMedicineById = async (id) => {
  await medicine.findById(id).then(res => {
    console.log(res.dataValues)
  }, err => {
    console.log(err)
  })
}

const findMedicineByName = async (name) => {
  await medicine.findAll({
    where: {name: name}
  }).then(res => {
    console.log(res[0].dataValues) //res为列表
  })
}

const updateMedicine = async (data) => {
  await medicine.update(data, {
    where: {chatId: data.chatId}
  }).then(res => {
    if (res[0] !== 0) {
      console.log(`更新了${res[0]}条数据`)
    } else {
      console.log(`数据没有变化！`)
    }
  })
}

const addMedicine = async (data) => {
  await medicine.create(data).then(res => {
    console.log(res.dataValues)
  }, err => {
    console.log(err)
  })
}

module.exports = {
  findMedicineById,
  findMedicineByName,
  updateMedicine,
  addMedicine
}
