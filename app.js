const Koa = require('koa')
const router = require('./router/index')
const bodyParser = require('koa-bodyparser');
const cros = require('koa2-cors');

const ws = require('ws')
const WebSocketServer = ws.Server

const app = new Koa()
let server = app.listen(3000)

app.use(cros({credentials: true}));
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods());

let wss = new WebSocketServer({
  server: server
})


wss.on('connection', ws => {
  console.log(`wss connected`)
  ws.on('message', message => {
    console.log(`接受客户端消息`, message)
    ws.send('服务端消息')
  })
})

console.log(`server running on port: 3000`)
