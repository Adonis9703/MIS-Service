const Koa = require('koa');
const router = require('./router/index');
const bodyParser = require('koa-bodyparser');
const cros = require('koa2-cors');
const jwtKoa = require('koa-jwt')

const app = new Koa();
const http = require('http').createServer(app.callback());
const io = require('socket.io')(http);

const {socketInfo, user, msgHistory} = require('./database/entity')
const {update} = require('./controller/userController')

http.listen(3000);

app.use(cros({credentials: true}));
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods());

app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '请登录后再操作',
        data: null
      }
    } else {
      throw err;
    }
  })
})

app.use(jwtKoa({
  secret: 'secret'
}).unless({
  path: [/\/register\/login/]
}));

io.on('connection', (socket) => {
  console.log('客户端已连接 socket id =', socket.id)
  socket.on('send', (data) => {
    console.log('来自客户端的消息', data)
    io.sockets.emit('get', {
      msg: '这是来自服务器的消息'
    })
  })
  //刷新用户socket
  socket.on('refresh', async (data) => {
    console.log('===> 用户登录，更新socket映射 <===')
    let param = {
      socketId: socket.id
    }
    await user.update(param, {
      where: {userId: data.userId}
    }).then(res => {
      console.log('===> socket 映射更新成功 <===')
    })
  })
  //患者端发起请求 服务器向医生端发起刷新问诊列表请求
  socket.on('createChat', async data => {
    await user.findById(data.doctorId).then(res => {
      io.to(res.dataValues.socketId).emit('refreshChatList')
    })
  })
  //医生端接诊后 让患者端刷新问诊状态
  socket.on('admissions', async data => {
    await user.findById(data.patientId).then(res => {
      io.to(res.dataValues.socketId).emit('refreshChatStatus')
    })
  })
  //医生端发消息给服务器 服务器转发至患者端 并保存聊天记录
  socket.on('doc2service', async data => {
    await user.findById(data.receiverId).then(async res => {
      let patientSocketId = res.dataValues.socketId
      await msgHistory.create(data).then(res => {
        io.to(patientSocketId).emit('service2pat', data)
        io.to(socket.id).emit('historySaved', {success: true})
      })
    })
  })
  //患者端发消息给服务器 服务器转发至医生端 并保存聊天记录
  socket.on('pat2service', async data => {
    await user.findById(data.receiverId).then(async res => {
      let doctorSocketId = res.dataValues.socketId
      await msgHistory.create(data).then(res => {
        io.to(doctorSocketId).emit('service2doc', data)
        io.to(socket.id).emit('historySaved', {success: true})
        console.log('患者端消息转发至医生端')
      })
    })
  })
  socket.on('disconnect', () => {
    console.log('客户端断开')
  })
})

console.log('service running on localhost:3000');
