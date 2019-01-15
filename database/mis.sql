/*
 Navicat Premium Data Transfer

 Source Server         : devtest
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : mis

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 15/01/2019 17:35:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chatinfo
-- ----------------------------
DROP TABLE IF EXISTS `chatinfo`;
CREATE TABLE `chatinfo`  (
  `chatId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '问诊Id',
  `doctorId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '医生id',
  `patientId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '患者id',
  `chatStatus` int(2) NULL DEFAULT NULL COMMENT '问诊状态 0待接诊 1问诊中 2已完成',
  `complain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '患者主诉',
  `diagnosis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生诊断',
  `chatTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '问诊发起时间',
  `rpId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '处方id',
  `complainImgs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '主诉图片',
  `doctorName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生姓名',
  `patientName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '患者姓名',
  PRIMARY KEY (`chatId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chatinfo
-- ----------------------------
INSERT INTO `chatinfo` VALUES ('2019011414323601163456', '123456', '5150510116', 0, '吃吃吃吃从从从从', NULL, '2019-01-14', NULL, NULL, '测试医生', '余思远');
INSERT INTO `chatinfo` VALUES ('2019011517205601160001', '10000001', '5150510116', 0, '测试22222222', NULL, '2019-01-15', NULL, NULL, '测试医生2', '余思远');

-- ----------------------------
-- Table structure for diseases
-- ----------------------------
DROP TABLE IF EXISTS `diseases`;
CREATE TABLE `diseases`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of diseases
-- ----------------------------
INSERT INTO `diseases` VALUES ('发烧');
INSERT INTO `diseases` VALUES ('咳嗽');
INSERT INTO `diseases` VALUES ('头疼');
INSERT INTO `diseases` VALUES ('心绞痛');
INSERT INTO `diseases` VALUES ('眩晕');
INSERT INTO `diseases` VALUES ('胸痛');
INSERT INTO `diseases` VALUES ('腹泻');
INSERT INTO `diseases` VALUES ('腹痛');

-- ----------------------------
-- Table structure for medicine
-- ----------------------------
DROP TABLE IF EXISTS `medicine`;
CREATE TABLE `medicine`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `amount` int(255) NULL DEFAULT NULL,
  `amountUnit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` float(255, 0) NULL DEFAULT NULL,
  `editTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `editPerson` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `dosage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `dosageUnit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `timeState` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medicine
-- ----------------------------
INSERT INTO `medicine` VALUES (1, '测试药品', 20, '盒', 12, '2018-12-25-4 11:35', '测试医师', '30', '毫克', '口服', '一天三次');
INSERT INTO `medicine` VALUES (2, '记忆面包', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for msghistory
-- ----------------------------
DROP TABLE IF EXISTS `msghistory`;
CREATE TABLE `msghistory`  (
  `chatId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '问诊唯一id chatId',
  `msgText` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '聊天文字信息',
  `senderType` int(2) NULL DEFAULT NULL COMMENT '发送者类型0患者 1医生',
  `msgTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息时间',
  `msgImgs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '聊天图片信息',
  `senderId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '发送者id',
  `receiverId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '接收者id',
  `id` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of msghistory
-- ----------------------------
INSERT INTO `msghistory` VALUES ('2019011414323601163456', '在吗在吗医生在吗', 0, '17:12', NULL, '5150510116', '123456', 76);
INSERT INTO `msghistory` VALUES ('2019011414323601163456', '你好，在的，你有病吗', 1, '17:12', NULL, '123456', '5150510116', 77);
INSERT INTO `msghistory` VALUES ('2019011517205601160001', '艾丹撒啊 啊锁定', 0, '17:21', NULL, '5150510116', '10000001', 78);
INSERT INTO `msghistory` VALUES ('2019011517205601160001', '你好啊 啊 实打', 1, '17:22', NULL, '10000001', '5150510116', 79);

-- ----------------------------
-- Table structure for rpinfo
-- ----------------------------
DROP TABLE IF EXISTS `rpinfo`;
CREATE TABLE `rpinfo`  (
  `rpId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '处方id',
  `chatId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '问诊id',
  `medicines` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '拼接的药品信息',
  `chatPrice` float(10, 2) NULL DEFAULT NULL COMMENT '问诊费用',
  `medPrice` float(10, 2) NULL DEFAULT NULL COMMENT '药品费用',
  `otherPrice` float(10, 2) NULL DEFAULT NULL COMMENT '其他费用',
  PRIMARY KEY (`rpId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rpinfo
-- ----------------------------
INSERT INTO `rpinfo` VALUES ('1', '20181224113501160000', NULL, 1.00, 23.00, 1.00);
INSERT INTO `rpinfo` VALUES ('2', '123456', '正天丸一天三次', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for socketinfo
-- ----------------------------
DROP TABLE IF EXISTS `socketinfo`;
CREATE TABLE `socketinfo`  (
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `socketId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'socket id',
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of socketinfo
-- ----------------------------
INSERT INTO `socketinfo` VALUES ('5150510116', 'YCG6-F-SWfq2uwq-AAAB');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学号或者工号',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `sex` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户性别',
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户手机号',
  `bloodType` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '血型',
  `allergy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '过敏信息',
  `other` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注信息',
  `age` int(5) NULL DEFAULT NULL COMMENT '年龄',
  `title` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生职称',
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生科室',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码',
  `userType` int(2) NULL DEFAULT NULL COMMENT '用户类型 0患者 1医生',
  `socketId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'socket id',
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('10000001', '测试医生2', '男', '13207478523', '', NULL, NULL, NULL, '护士', '全科', '123456', 1, '3GlzVU3rDZAdzuOfAAAG');
INSERT INTO `userinfo` VALUES ('123456', '测试医生', '男', '15869106432', NULL, NULL, NULL, NULL, '医师', '全科', '123456', 1, '3GlzVU3rDZAdzuOfAAAG');
INSERT INTO `userinfo` VALUES ('5150510116', '余思远', '男', '15869106432', 'A', '傻子过敏', '备注备注备注', 21, 'null', 'null', '123456', 0, 'xdN_66gsdZNlkeC3AAAI');

SET FOREIGN_KEY_CHECKS = 1;
