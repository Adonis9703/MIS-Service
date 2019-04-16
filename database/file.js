const multer = require('koa-multer')
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    console.log('请求信息', req.body)
    console.log('原始文件名', file.originalname)
    let fileFormat = (file.originalname).split(".")
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

const upload = multer({storage: storage})

module.exports = {
  upload
}
