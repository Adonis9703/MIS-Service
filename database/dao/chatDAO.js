const {chatInfo} = require('../entity')

const findChatById = async (id) => {
  await chatInfo.findById(id).then(res => {
    console.log(res.dataValues)
  }, err => {
    console.log(err)
  })
}

const findChatByPatientId = async (userId) => {
  await chatInfo.findAll({
    where: {patientId: userId}
  }).then(res => {
    console.log(res[0].dataValues)
  })
}

const findChatByDoctorId = async (userId) => {
  await chatInfo.findAll({
    where: {doctorId: userId}
  }).then(res => {
    console.log(res[0].dataValues)
  })
}

const updateChat = async (data) => {
  await chatInfo.update(data, {
    where: {
      chatId: data.chatId
    }
  }).then(res => {
    if (res[0] !== 0) {
      console.log(`更新了${res[0]}条数据`)
    } else {
      console.log(`数据没有变化！`)
    }
  })
}

const addChat = async (data) => {
  await chatInfo.create(data).then(res => {
    console.log(res.dataValues)
  }, err => {
    console.log(err)
  })
}

module.exports = {
  findChatById,
  updateChat,
  addChat,
  findChatByDoctorId,
  findChatByPatientId
}
