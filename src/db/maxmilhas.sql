/**
 * CREATE DATABASE `maxmilhas`;
 * USE `maxmilhas`;
*/
CREATE TABLE `listrestrictedcpf`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numberCpf` varchar(11) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `createdAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

