const Koa = require('koa');
const router = require('./router/index');
const bodyParser = require('koa-bodyparser');
const cros = require('koa2-cors');
const jwtKoa = require('koa-jwt')

const app = new Koa();
const http = require('http').createServer(app.callback());
const io = require('socket.io')(http);

const {socketInfo} = require('./database/entity')

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
  socket.on('register', async (data) => {
      console.log('===> 用户注册，生成socket映射 <===')
      let param = {
        userId: data.userId,
        socketId: socket.id
      }
      await socketInfo.create(param).then(res => {
        console.log(res.dataValues)
      }, err => {
        console.log(err)
      })
  })
  socket.on('login', async (data) => {
    console.log('===> 用户登录，更新socket映射 <===')
    let param = {
      userId: data.userId,
      socketId: socket.id
    }
    await socketInfo.update(param,{
      where: {userId: param.userId}
    }).then(res => {
      console.log('===> socket 映射更新成功 <===')
    })
  })
})

console.log('service running on localhost:3000');
