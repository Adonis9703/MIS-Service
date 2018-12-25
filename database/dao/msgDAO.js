const {msgHistory} = require('../entity')

const findMsgByChatId = async (id) => {
  await msgHistory.findAll({
    where: {chatId: id}
  }).then(res => {
    console.log(res[0].dataValues)
  })
}

const addMsg = async (data) => {
  await msgHistory.create(data).then(res => {
    console.log(res.dataValues)
  }, err => {
    console.log(err)
  })
}
module.exports = {
  findMsgByChatId,
  addMsg
}
