const Sequelize = require('sequelize')
const config = require('./config')

/**
 * Model索引
 * 用户Model，药品Model，问诊信息Model，
 * 聊天记录Model，处方Model，socket Model，常见疾病Model
 * @type {Sequelize}
 */

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

/**
 * 用户Model
 * @type {Model}
 */
let user = sequelize.define('userinfo', {
  userId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  sex: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  tel: {
    type: Sequelize.STRING,
    allowNull: true
  },
  bloodType: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  allergy: {
    type: Sequelize.STRING,
    allowNull: true
  },
  other: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  age: {
    type: Sequelize.INTEGER(5),
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING(10),
    allowNull: true,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userType: {
    type: Sequelize.INTEGER(2),
    allowNull: true
  },
  socketId: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
})

/**
 * 药品Model
 * @type {Model}
 */
let medicine = sequelize.define('medicine', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  amountUnit: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  editTime: {
    type: Sequelize.STRING,
    allowNull: true
  },
  editPerson: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dosage: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dosageUnit: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  method: {
    type: Sequelize.STRING,
    allowNull: true
  },
  timeState: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
})

/**
 * 问诊信息Model
 * @type {Model}
 */
let chatInfo = sequelize.define('chatinfo', {
  chatId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  doctorId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  doctorName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  patientName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  patientId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  chatStatus: {
    type: Sequelize.INTEGER(2),
    allowNull: true
  },
  complain: {
    type: Sequelize.STRING,
    allowNull: true
  },
  diagnosis: {
    type: Sequelize.STRING,
    allowNull: true
  },
  chatTime: {
    type: Sequelize.STRING,
    allowNull: true
  },
  rpId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  complainImgs: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
})

/**
 * 聊天记录Model
 * @type {Model}
 */
let msgHistory = sequelize.define('msghistory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  chatId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  receiverId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senderType: {
    type: Sequelize.INTEGER(2),
    allowNull: true
  },
  msgText: {
    type: Sequelize.STRING,
    allowNull: true
  },
  msgImgs: {
    type: Sequelize.STRING,
    allowNull: true
  },
  msgTime: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
})

/**
 * 处方Model
 * @type {Model}
 */
let rpInfo = sequelize.define('rpinfo', {
  rpId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  chatId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  medicines: {
    type: Sequelize.STRING,
    allowNull: true
  },
  chatPrice: {
    type: Sequelize.FLOAT(10),
    allowNull: true
  },
  medPrice: {
    type: Sequelize.STRING,
    allowNull: true
  },
  otherPrice: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
})

/**
 * socket Model
 * @type {Model}
 */
let socketInfo = sequelize.define('socketinfo', {
  userId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  socketId: {
    type: Sequelize.STRING,
    allowNull: true
  }
  // status: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

/**
 * 常见疾病Model
 * @type {Model}
 */
let diseases = sequelize.define('diseases', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true
  }
}, {
  timestamps: false,
  freezeTableName: true
})
module.exports = {
  user,
  medicine,
  chatInfo,
  msgHistory,
  rpInfo,
  socketInfo,
  diseases
}
