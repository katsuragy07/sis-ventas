-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sisventas
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aperturas`
--

DROP TABLE IF EXISTS `aperturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aperturas` (
  `idapertura` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_apertura` datetime DEFAULT NULL,
  `fecha_cierre` datetime DEFAULT NULL,
  `monto_apertura` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `monto_cierre` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cajas_idcaja` int(11) NOT NULL,
  `usuarios_idusuario` int(11) NOT NULL,
  PRIMARY KEY (`idapertura`),
  KEY `fk_aperturas_cajas1_idx` (`cajas_idcaja`),
  KEY `fk_aperturas_usuarios1_idx` (`usuarios_idusuario`),
  CONSTRAINT `fk_aperturas_cajas1` FOREIGN KEY (`cajas_idcaja`) REFERENCES `cajas` (`idcaja`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_aperturas_usuarios1` FOREIGN KEY (`usuarios_idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aperturas`
--

LOCK TABLES `aperturas` WRITE;
/*!40000 ALTER TABLE `aperturas` DISABLE KEYS */;
INSERT INTO `aperturas` VALUES (1,'2019-11-28 10:03:11','2019-12-10 09:37:11','0','100',1,1),(2,'2019-12-10 09:37:14','2019-12-10 12:11:39','100','151.92',1,1),(3,'2019-12-10 12:11:57','2020-08-13 22:52:21','151.92','5740.87',1,1),(4,'2020-08-13 22:52:27','2020-08-13 23:35:13','5740.87','5750.87',1,1),(5,'2020-08-13 23:35:20',NULL,'5750.87',NULL,1,1);
/*!40000 ALTER TABLE `aperturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cajas`
--

DROP TABLE IF EXISTS `cajas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cajas` (
  `idcaja` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `capital` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `estado` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`idcaja`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cajas`
--

LOCK TABLES `cajas` WRITE;
/*!40000 ALTER TABLE `cajas` DISABLE KEYS */;
INSERT INTO `cajas` VALUES (1,'Caja Principal','5949.81','ABIERTO','2019-11-28 10:00:25'),(2,'Caja 2','0','DESHABILITADO','2020-08-13 22:58:05');
/*!40000 ALTER TABLE `cajas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `idcliente` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_doc` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nro_doc` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `apellido_pat` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `apellido_mat` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `empresa` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `direccion` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `comentario` text COLLATE utf8_spanish_ci,
  `url_foto` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `habilitado` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`idcliente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'RUC','546546523','ARIZAGA','CASTILLO','MARIA','','PJ. LOS ROSALES N 270','cscsac','5f37474c00d1d.jpg','43543','SI','sds dsa dsd@sdad'),(2,'DNI','3454354','RAMIREZ','ROJAS','JOSE','UNCP','PJ. LOS ROSALES N 270','',NULL,'otros','SI','');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cotizaciones`
--

DROP TABLE IF EXISTS `cotizaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cotizaciones` (
  `idcotizacion` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_reg` datetime NOT NULL,
  `estado` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `igv` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `total` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p1_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p1_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p1_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p2_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p2_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p2_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p3_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p3_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p3_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p4_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p4_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p4_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p5_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p5_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p5_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `clientes_idcliente` int(11) NOT NULL,
  `usuarios_idusuario` int(11) NOT NULL,
  `productos_idproducto` int(11) DEFAULT NULL,
  `productos_idproducto1` int(11) DEFAULT NULL,
  `productos_idproducto2` int(11) DEFAULT NULL,
  `productos_idproducto3` int(11) DEFAULT NULL,
  `productos_idproducto4` int(11) DEFAULT NULL,
  `validez_prof` varchar(55) COLLATE utf8_spanish_ci DEFAULT NULL,
  `entrega_prof` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `comprobante_prof` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`idcotizacion`),
  KEY `fk_cotizaciones_clientes1_idx` (`clientes_idcliente`),
  KEY `fk_cotizaciones_usuarios1_idx` (`usuarios_idusuario`),
  KEY `fk_cotizaciones_productos1_idx` (`productos_idproducto`),
  KEY `fk_cotizaciones_productos2_idx` (`productos_idproducto1`),
  KEY `fk_cotizaciones_productos3_idx` (`productos_idproducto2`),
  KEY `fk_cotizaciones_productos4_idx` (`productos_idproducto3`),
  KEY `fk_cotizaciones_productos5_idx` (`productos_idproducto4`),
  CONSTRAINT `fk_cotizaciones_clientes1` FOREIGN KEY (`clientes_idcliente`) REFERENCES `clientes` (`idcliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos1` FOREIGN KEY (`productos_idproducto`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos2` FOREIGN KEY (`productos_idproducto1`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos3` FOREIGN KEY (`productos_idproducto2`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos4` FOREIGN KEY (`productos_idproducto3`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos5` FOREIGN KEY (`productos_idproducto4`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_usuarios1` FOREIGN KEY (`usuarios_idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizaciones`
--

LOCK TABLES `cotizaciones` WRITE;
/*!40000 ALTER TABLE `cotizaciones` DISABLE KEYS */;
INSERT INTO `cotizaciones` VALUES (206,'2019-11-29 17:27:59','ATENDIDO','0','2.2','2','110','2.2','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'10 dias','3 dias','factura'),(207,'2019-11-29 17:36:35','EMITIDO','','44','4','110','44','','','','','','','','','','','','',1,1,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(209,'2019-11-29 17:56:35','ATENDIDO','','33','3','110','33','','','','','','','','','','','','',1,1,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(210,'2019-11-29 17:57:30','ATENDIDO','','1617','4','110','44','3','','','10','110','220','2','11','22','1111','110','1331',1,1,2,NULL,5,2,5,NULL,NULL,NULL),(211,'2019-11-30 11:58:10','EMITIDO','0','3.3','3','110','3.3','','','','1','','','','','','','','',1,1,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(212,'2019-12-09 11:38:55','EMITIDO','','0','','','','','','','','','','','','','','','',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(213,'2019-12-09 11:40:25','EMITIDO','','180.4','200','110','220','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(214,'2019-12-09 11:46:27','EMITIDO','18','11.8','1','110','10','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(215,'2019-12-12 16:29:03','EMITIDO','0','165','150','110','165','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(216,'2019-12-12 16:29:13','EMITIDO','0','387','150','110','165','100','222','222','','','','','','','','','',1,1,5,9,NULL,NULL,NULL,NULL,NULL,NULL),(217,'2019-12-12 16:36:21','EMITIDO','0','','','','','','','','','','','','','','','','',1,1,2,NULL,5,NULL,NULL,NULL,NULL,NULL),(218,'2019-12-12 16:36:42','EMITIDO','0','','','','','','','','','','','','','','','','',1,1,2,NULL,5,NULL,NULL,NULL,NULL,NULL),(219,'2019-12-12 16:38:10','EMITIDO','0','66','1','110','1.1','2','110','2.2','3','110','3.3','4','110','4.4','50','110','55',1,1,2,5,5,2,5,NULL,NULL,NULL),(220,'2019-12-12 16:41:33','ATENDIDO','0','135.3','','','','123','110','135.3','','','','','','','','','',1,1,NULL,5,NULL,NULL,NULL,NULL,NULL,NULL),(221,'2019-12-12 16:42:07','EMITIDO','0','0','3','','','','','','','','','','','','','','',1,1,9,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(222,'2019-12-12 16:43:01','EMITIDO','0','0','2','','','','','','','','','','','','','','',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(223,'2019-12-13 17:10:30','EMITIDO','0','330','300','110','330','','','','23','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(224,'2019-12-13 17:11:06','ATENDIDO','0','111','50','222','111','','','','','','','','','','','','',1,1,9,NULL,NULL,NULL,NULL,'10 dias','3 dias','factura'),(225,'2019-12-13 17:11:26','ATENDIDO','0','2200','2000','110','2200','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'10 dias','3 dias','factura'),(226,'2019-12-13 17:12:16','ATENDIDO','0','1550','1500','110','1550','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'10 dias','3 dias','factura'),(227,'2019-12-16 12:06:14','ATENDIDO','0','220','200','110','220','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'30 dias','5 dias','boleta'),(228,'2019-12-16 12:36:15','ATENDIDO','0','354.18','200','110.4','220.8','60','222.3','133.38','','','','','','','','','',1,1,5,9,NULL,NULL,NULL,'10 dias','3 dias','factura'),(229,'2019-12-16 17:55:55','EMITIDO','18','376.42','12','13','156','2','13','26','3','13','39','5','13','65','3','11','33',1,1,7,7,7,7,17,'10 dias','3 dias','factura'),(230,'2019-12-17 10:52:27','ATENDIDO','0','5.5','5','110','5.5','','','','','','','','','','','','',2,1,2,NULL,NULL,NULL,NULL,'10 dias','3 dias','factura'),(231,'2019-12-17 11:41:38','ATENDIDO','0','13.2','12','110','13.2','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'10 dias','3 dias','factura'),(232,'2020-01-11 11:11:48','ATENDIDO','0','330','3','110','330','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'10 dias','3 dias','factura'),(233,'2020-08-14 21:02:26','ATENDIDO','18','25.96','2','11','22','','','','','','','','','','','','',1,1,17,NULL,NULL,NULL,NULL,'20 dias','10 dias','boleta');
/*!40000 ALTER TABLE `cotizaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos` (
  `idmovimiento` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `monto` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `concepto` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_mov` datetime NOT NULL,
  `autoriza` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo_comprobante` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nro_comprobante` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `detalle` text COLLATE utf8_spanish_ci,
  `cajas_idcaja` int(11) NOT NULL,
  `usuarios_idusuario` int(11) NOT NULL,
  PRIMARY KEY (`idmovimiento`),
  KEY `fk_movimientos_cajas1_idx` (`cajas_idcaja`),
  KEY `fk_movimientos_usuarios1_idx` (`usuarios_idusuario`),
  CONSTRAINT `fk_movimientos_cajas1` FOREIGN KEY (`cajas_idcaja`) REFERENCES `cajas` (`idcaja`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_movimientos_usuarios1` FOREIGN KEY (`usuarios_idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos`
--

LOCK TABLES `movimientos` WRITE;
/*!40000 ALTER TABLE `movimientos` DISABLE KEYS */;
INSERT INTO `movimientos` VALUES (1,'INGRESO','100','otros','2019-11-28 10:03:37','','boleta','65456','',1,1),(2,'INGRESO','5','VENTA CONTRATA','2019-12-10 09:53:58','CAJERO','VOUCHER','',NULL,1,1),(3,'INGRESO','0','VENTA CONTRATA','2019-12-10 10:47:40','CAJERO','VOUCHER','',NULL,1,1),(4,'INGRESO','100','VENTA CONTRATA','2019-12-10 11:02:02','CAJERO','VOUCHER','',NULL,1,1),(5,'INGRESO','20.96','VENTA CONTRATA','2019-12-10 11:06:16','CAJERO','VOUCHER','',NULL,1,1),(6,'INGRESO','25.96','VENTA CONTRATA','2019-12-10 11:06:30','CAJERO','VOUCHER','',NULL,1,1),(7,'INGRESO','80','VENTA CONTRATA','2019-12-12 17:08:38','CAJERO','VOUCHER','',NULL,1,1),(8,'INGRESO','55.31','VENTA CONTRATA','2019-12-12 17:09:00','CAJERO','VOUCHER','',NULL,1,1),(9,'INGRESO','20','VENTA CONTRATA','2019-12-12 17:12:06','CAJERO','VOUCHER','',NULL,1,1),(10,'INGRESO','222','VENTA FINALIZADA','2019-12-12 17:12:14','CAJERO','VOUCHER','',NULL,1,1),(11,'INGRESO','5','scacsac','2019-12-12 17:20:01',NULL,NULL,NULL,'',1,1),(12,'EGRESO','6','sadsad','2019-12-12 17:20:11',NULL,NULL,NULL,'',1,1),(13,'INGRESO','20','VENTA CONTRATA','2019-12-16 12:12:10','CAJERO','VOUCHER','',NULL,1,1),(14,'INGRESO','200','VENTA FINALIZADA','2019-12-16 12:12:24','CAJERO','VOUCHER','',NULL,1,1),(15,'INGRESO','50','VENTA CONTRATA','2019-12-16 12:25:26','CAJERO','VOUCHER','',NULL,1,1),(16,'INGRESO','100','VENTA CONTRATA','2019-12-16 12:30:30','CAJERO','VOUCHER','',NULL,1,1),(17,'INGRESO','2100','VENTA FINALIZADA','2019-12-16 12:30:42','CAJERO','VOUCHER','',NULL,1,1),(18,'INGRESO','50','VENTA CONTRATA','2019-12-16 12:32:17','CAJERO','VOUCHER','',NULL,1,1),(19,'INGRESO','115','VENTA FINALIZADA','2019-12-16 12:32:31','CAJERO','VOUCHER','',NULL,1,1),(20,'INGRESO','30','VENTA CONTRATA','2019-12-16 12:36:45','CAJERO','VOUCHER','',NULL,1,1),(21,'INGRESO','324.18','VENTA FINALIZADA','2019-12-16 12:36:58','CAJERO','VOUCHER','',NULL,1,1),(22,'INGRESO','8','VENTA CONTRATA','2019-12-16 15:48:58','CAJERO','VOUCHER','','DEPOSITO',1,1),(23,'INGRESO','80','VENTA FINALIZADA','2019-12-16 15:56:58','CAJERO','VOUCHER','','',1,1),(24,'INGRESO','80','VENTA FINALIZADA','2019-12-16 15:57:28','CAJERO','VOUCHER','','',1,1),(25,'INGRESO','80','VENTA FINALIZADA','2019-12-16 15:57:28','CAJERO','VOUCHER','','',1,1),(26,'INGRESO','80','VENTA FINALIZADA','2019-12-16 15:57:29','CAJERO','VOUCHER','','',1,1),(27,'INGRESO','80','VENTA FINALIZADA','2019-12-16 15:58:21','CAJERO','VOUCHER','','',1,1),(28,'INGRESO','20','VENTA CONTRATA','2019-12-16 15:59:24','CAJERO','VOUCHER','','EFECTIVO',1,1),(29,'INGRESO','91','VENTA FINALIZADA','2019-12-16 15:59:36','CAJERO','VOUCHER','','DEPOSITO',1,1),(30,'INGRESO','30','otros','2019-12-16 16:05:26',NULL,NULL,NULL,'deposito al bnaco x x motivo',1,1),(31,'EGRESO','150','OTROS','2019-12-16 17:21:44',NULL,NULL,NULL,'Gastos de mantenimiento',1,1),(32,'INGRESO','2','VENTA CONTRATA','2019-12-17 11:19:44','CAJERO','VOUCHER','','EFECTIVO',1,1),(33,'INGRESO','3.5','VENTA FINALIZADA','2019-12-17 11:20:42','CAJERO','VOUCHER','','EFECTIVO',1,1),(34,'INGRESO','2','VENTA CONTRATA','2019-12-17 11:46:58','CAJERO','VOUCHER','','EFECTIVO',1,1),(35,'EGRESO','200','otros','2020-01-10 19:21:46',NULL,NULL,NULL,'',1,1),(36,'INGRESO','200','VENTA CONTRATA','2020-01-11 11:29:23','CAJERO','VOUCHER','','EFECTIVO',1,1),(37,'INGRESO','30','VENTA CONTRATA','2020-01-11 11:29:44','CAJERO','VOUCHER','','EFECTIVO',1,1),(38,'INGRESO','300','VENTA FINALIZADA','2020-01-11 11:34:13','CAJERO','VOUCHER','','EFECTIVO',1,1),(39,'INGRESO','466','VENTA FINALIZADA','2020-01-11 11:34:22','CAJERO','VOUCHER','','EFECTIVO',1,1),(40,'INGRESO','20.96','VENTA FINALIZADA','2020-08-13 21:28:05','CAJERO','VOUCHER','','EFECTIVO',1,1),(41,'INGRESO','1000','VENTA CONTRATA','2020-08-13 21:31:00','CAJERO','VOUCHER','','EFECTIVO',1,1),(42,'INGRESO','10','otros','2020-08-13 23:29:35',NULL,NULL,NULL,'',1,1),(43,'INGRESO','50','VENTA CONTRATA','2020-08-14 19:04:22','CAJERO','VOUCHER','','EFECTIVO',1,1),(44,'INGRESO','100','VENTA CONTRATA','2020-08-14 19:09:11','CAJERO','VOUCHER','','EFECTIVO',1,1),(45,'INGRESO','10','VENTA CONTRATA','2020-08-14 21:02:54','CAJERO','VOUCHER','','EFECTIVO',1,1),(46,'INGRESO','15','VENTA CONTRATA','2020-08-14 21:03:30','CAJERO','VOUCHER','','EFECTIVO',1,1),(47,'INGRESO','23.94','VENTA FINALIZADA','2020-08-14 21:03:41','CAJERO','VOUCHER','','EFECTIVO',1,1);
/*!40000 ALTER TABLE `movimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `idpago` int(11) NOT NULL AUTO_INCREMENT,
  `n_cuota_programada` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_programada` date NOT NULL,
  `cuota_programada` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `monto` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `mora` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `creditos_idcredito` int(11) NOT NULL,
  `usuarios_idusuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idpago`),
  KEY `fk_pagos_usuarios1_idx` (`usuarios_idusuario`),
  CONSTRAINT `fk_pagos_usuarios1` FOREIGN KEY (`usuarios_idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procesos`
--

DROP TABLE IF EXISTS `procesos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procesos` (
  `idproceso` int(11) NOT NULL AUTO_INCREMENT,
  `material_proc` varchar(75) COLLATE utf8_spanish_ci NOT NULL,
  `precio_proc` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `productos_idproducto` int(11) NOT NULL,
  PRIMARY KEY (`idproceso`),
  KEY `fk_procesos_productos1_idx` (`productos_idproducto`),
  CONSTRAINT `fk_procesos_productos1` FOREIGN KEY (`productos_idproducto`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procesos`
--

LOCK TABLES `procesos` WRITE;
/*!40000 ALTER TABLE `procesos` DISABLE KEYS */;
INSERT INTO `procesos` VALUES (6,'qqq','12',5),(7,'ccc','5',5),(9,'fff','32',17),(10,'s1','11',18);
/*!40000 ALTER TABLE `procesos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_categoria`
--

DROP TABLE IF EXISTS `producto_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_categoria` (
  `idcat_prod` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cat` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci,
  PRIMARY KEY (`idcat_prod`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_categoria`
--

LOCK TABLES `producto_categoria` WRITE;
/*!40000 ALTER TABLE `producto_categoria` DISABLE KEYS */;
INSERT INTO `producto_categoria` VALUES (1,'categoria 1','otros'),(3,'TEXTIL','POLOS CASACAS, ETC');
/*!40000 ALTER TABLE `producto_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_subcategoria`
--

DROP TABLE IF EXISTS `producto_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_subcategoria` (
  `idsubcat_prod` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_subcat` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci,
  `producto_categoria_idcat_prod` int(11) NOT NULL,
  PRIMARY KEY (`idsubcat_prod`),
  KEY `fk_producto_subcategoria_producto_categoria1_idx` (`producto_categoria_idcat_prod`),
  CONSTRAINT `fk_producto_subcategoria_producto_categoria1` FOREIGN KEY (`producto_categoria_idcat_prod`) REFERENCES `producto_categoria` (`idcat_prod`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_subcategoria`
--

LOCK TABLES `producto_subcategoria` WRITE;
/*!40000 ALTER TABLE `producto_subcategoria` DISABLE KEYS */;
INSERT INTO `producto_subcategoria` VALUES (1,'subcat1','otros01',1),(4,'CASACAS','ABRIGOS',3);
/*!40000 ALTER TABLE `producto_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idproducto` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_prod` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_prod` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `caracteristicas` text COLLATE utf8_spanish_ci,
  `stock` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `precio_prov_uni` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `precio_vent_uni` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `habilitado` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `producto_subcategoria_idsubcat_prod` int(11) NOT NULL,
  `url_foto` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `proveedores_idproveedor` int(11) DEFAULT NULL,
  `proveedores_idproveedor1` int(11) DEFAULT NULL,
  `proveedores_idproveedor2` int(11) DEFAULT NULL,
  `rentabilidad` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `proceso_des` text COLLATE utf8_spanish_ci,
  PRIMARY KEY (`idproducto`),
  KEY `fk_productos_producto_subcategoria1_idx` (`producto_subcategoria_idsubcat_prod`),
  KEY `fk_productos_proveedores1_idx` (`proveedores_idproveedor`),
  KEY `fk_productos_proveedores2_idx` (`proveedores_idproveedor1`),
  KEY `fk_productos_proveedores3_idx` (`proveedores_idproveedor2`),
  CONSTRAINT `fk_productos_producto_subcategoria1` FOREIGN KEY (`producto_subcategoria_idsubcat_prod`) REFERENCES `producto_subcategoria` (`idsubcat_prod`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_proveedores1` FOREIGN KEY (`proveedores_idproveedor`) REFERENCES `proveedores` (`idproveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_proveedores2` FOREIGN KEY (`proveedores_idproveedor1`) REFERENCES `proveedores` (`idproveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_proveedores3` FOREIGN KEY (`proveedores_idproveedor2`) REFERENCES `proveedores` (`idproveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,'00006','Producto 6','sdfdsf','','101','110','SI',1,'',NULL,NULL,NULL,'1',''),(5,'00001','CASACA CUERO','Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. ','','100','110','SI',4,'',1,NULL,NULL,'1',''),(7,'0005','Producto 5','ascsac','','3','13','SI',1,'5f306fc006508.jpg',2,NULL,1,'1',''),(8,'0004','Producto 4','fff','','1','1','SI',1,NULL,NULL,NULL,NULL,'1',''),(9,'0003','Producto 3','','','22','222','SI',1,NULL,NULL,NULL,NULL,'1',''),(17,'0002','Producto 2','aaaaa','','8','11','SI',1,'',NULL,NULL,NULL,'1.5','ferf e rrg\r\n\r\ndsf2 2\r\n '),(18,'0001','Producto 1','tt','','34','44','SI',1,NULL,NULL,NULL,NULL,'1','...');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor_categoria`
--

DROP TABLE IF EXISTS `proveedor_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor_categoria` (
  `idcat_prov` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cat` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci,
  PRIMARY KEY (`idcat_prov`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor_categoria`
--

LOCK TABLES `proveedor_categoria` WRITE;
/*!40000 ALTER TABLE `proveedor_categoria` DISABLE KEYS */;
INSERT INTO `proveedor_categoria` VALUES (1,'cat prov 1','dffdv'),(2,'prov cat 2','fdvfv');
/*!40000 ALTER TABLE `proveedor_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor_subcategoria`
--

DROP TABLE IF EXISTS `proveedor_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor_subcategoria` (
  `idsubcat_prov` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_subcat` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci,
  `proveedor_categoria_idcat_prov` int(11) NOT NULL,
  PRIMARY KEY (`idsubcat_prov`),
  KEY `fk_proveedor_subcategoria_proveedor_categoria1_idx` (`proveedor_categoria_idcat_prov`),
  CONSTRAINT `fk_proveedor_subcategoria_proveedor_categoria1` FOREIGN KEY (`proveedor_categoria_idcat_prov`) REFERENCES `proveedor_categoria` (`idcat_prov`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor_subcategoria`
--

LOCK TABLES `proveedor_subcategoria` WRITE;
/*!40000 ALTER TABLE `proveedor_subcategoria` DISABLE KEYS */;
INSERT INTO `proveedor_subcategoria` VALUES (1,'prov subcat 1','vdsvdv',1),(2,'1','',2);
/*!40000 ALTER TABLE `proveedor_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `idproveedor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_prov` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `ruc` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `responsable` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `direccion` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `correo` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `celular` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `banco1` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `banco2` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `banco3` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `banco4` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cuenta1` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cuenta2` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cuenta3` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cuenta4` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `observaciones` text COLLATE utf8_spanish_ci,
  `proveedor_subcategoria_idsubcat_prov` int(11) NOT NULL,
  PRIMARY KEY (`idproveedor`),
  KEY `fk_proveedores_proveedor_subcategoria1_idx` (`proveedor_subcategoria_idsubcat_prov`),
  CONSTRAINT `fk_proveedores_proveedor_subcategoria1` FOREIGN KEY (`proveedor_subcategoria_idsubcat_prov`) REFERENCES `proveedor_subcategoria` (`idsubcat_prov`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'GLORIA','165412','sdfdsf','sdfdsf','sds dsa dsd@sdad','234324','33333','b','v','c','x','','','','','xxx x ',1),(2,'GAMARRA SAC','5555','eeeee','eeee','','','','','','','','','','','','',2),(3,'FABER CASTELL','','jjj','jjjjj','','','','','','','','','','','','',1);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `privilegios` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `apellido_pat` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `apellido_mat` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `doc_nro` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `usuario` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `pass` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(55) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(55) COLLATE utf8_spanish_ci DEFAULT NULL,
  `url_foto` varchar(55) COLLATE utf8_spanish_ci DEFAULT NULL,
  `habilitado` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'ROOT','Admin','Admin','Admin','11111111','admin','admin','12313','sddbdb','','','SI'),(2,'COTIZADOR','cotizador','cotizador','cotizador','646546','cotizador','cotizador','456465','cotizador','',NULL,'SI'),(3,'CAJA','caja','caja','caja','64654552','caja','caja','caja','caja','',NULL,'SI');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `idventa` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_reg` datetime NOT NULL,
  `estado` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `igv` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `adelanto` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `total` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p1_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p1_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p1_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p2_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p2_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p2_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p3_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p3_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p3_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p4_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p4_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p4_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `p5_cant` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `p5_pu` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `p5_st` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `clientes_idcliente` int(11) NOT NULL,
  `usuarios_idusuario` int(11) NOT NULL,
  `productos_idproducto` int(11) DEFAULT NULL,
  `productos_idproducto1` int(11) DEFAULT NULL,
  `productos_idproducto2` int(11) DEFAULT NULL,
  `productos_idproducto3` int(11) DEFAULT NULL,
  `productos_idproducto4` int(11) DEFAULT NULL,
  `entrega_vent` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `comprobante_vent` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo_pago_adelanto` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo_pago_resto` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`idventa`),
  KEY `fk_cotizaciones_clientes1_idx` (`clientes_idcliente`),
  KEY `fk_cotizaciones_usuarios1_idx` (`usuarios_idusuario`),
  KEY `fk_cotizaciones_productos1_idx` (`productos_idproducto`),
  KEY `fk_cotizaciones_productos2_idx` (`productos_idproducto1`),
  KEY `fk_cotizaciones_productos3_idx` (`productos_idproducto2`),
  KEY `fk_cotizaciones_productos4_idx` (`productos_idproducto3`),
  KEY `fk_cotizaciones_productos5_idx` (`productos_idproducto4`),
  CONSTRAINT `fk_cotizaciones_clientes10` FOREIGN KEY (`clientes_idcliente`) REFERENCES `clientes` (`idcliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos10` FOREIGN KEY (`productos_idproducto`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos20` FOREIGN KEY (`productos_idproducto1`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos30` FOREIGN KEY (`productos_idproducto2`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos40` FOREIGN KEY (`productos_idproducto3`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_productos50` FOREIGN KEY (`productos_idproducto4`) REFERENCES `productos` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizaciones_usuarios10` FOREIGN KEY (`usuarios_idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,'2019-12-09 16:02:19','COMPLETADO','18','','25.96','2','110','22','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'2019-12-09 16:05:44','COMPLETADO','18','','0','','','','','','','','','','','','','','','',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'2019-12-09 17:27:58','COMPLETADO','18','12','25.96','2','110','22','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'2019-12-10 09:41:11','COMPLETADO','18','5','25.96','2','110','22','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'2019-12-10 09:42:27','CONTRATADO','5','3','23.1','2','110','22','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'2019-12-10 09:44:56','COMPLETADO','18','3','38.94','3','110','33','','','','','','','','','','','','',1,1,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'2019-12-10 09:46:32','COMPLETADO','18','0','1908.06','4','110','44','3','','','10','110','220','2','11','22','1111','110','1331',1,1,2,NULL,5,2,5,NULL,NULL,NULL,NULL),(15,'2019-12-10 09:53:58','COMPLETADO','18','5','25.96','2','110','22','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'2019-12-10 10:47:40','COMPLETADO','18','0','25.96','2','110','22','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'2019-12-12 17:08:38','COMPLETADO','0','80','135.3','','','','123','110','135.3','','','','','','','','','',1,1,NULL,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'2019-12-12 17:12:06','COMPLETADO','0','20','242','','','','220','110','242','','','','','','','','','',1,1,NULL,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'2019-12-16 12:12:10','COMPLETADO','0','20','220','200','110','220','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'2019-12-16 12:25:26','CONTRATADO','0','50','1550','1500','110','1550','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'2019-12-16 12:30:30','COMPLETADO','0','100','2200','2000','110','2200','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'3 dias','factura',NULL,NULL),(22,'2019-12-16 12:32:17','COMPLETADO','0','50','165','150','110','165','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'10 dias','1 semana',NULL,NULL),(23,'2019-12-16 12:36:45','COMPLETADO','0','30','354.18','200','110.4','220.8','60','222.3','133.38','','','','','','','','','',1,1,5,9,NULL,NULL,NULL,'3 dias','factura','DEPOSITO','DEPOSITO'),(24,'2019-12-16 15:48:58','COMPLETADO','0','8','88','23','110','25.3','','','','','','','57','110','62.7','','','',1,1,5,NULL,NULL,5,NULL,'3 dias','factura','DEPOSITO',NULL),(25,'2019-12-16 15:59:24','COMPLETADO','0','20','111','50','222','111','','','','','','','','','','','','',1,1,9,NULL,NULL,NULL,NULL,'3 dias','factura','EFECTIVO',NULL),(26,'2019-12-17 11:19:44','COMPLETADO','0','2','5.5','5','110','5.5','','','','','','','','','','','','',2,1,2,NULL,NULL,NULL,NULL,'3 dias','factura','EFECTIVO',NULL),(27,'2019-12-17 11:46:58','CONTRATADO','0','2','13.2','12','110','13.2','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'3 dias','factura','EFECTIVO',NULL),(28,'2020-01-11 11:29:23','COMPLETADO','0','200','666','3','222','666','','','','','','','','','','','','',2,1,9,NULL,NULL,NULL,NULL,'3 dias','factura','EFECTIVO',NULL),(29,'2020-01-11 11:29:44','COMPLETADO','0','30','330','3','110','330','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'3 dias','factura','EFECTIVO',NULL),(30,'2020-08-13 21:31:00','CONTRATADO','0','1000','2200','20','110','2200','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'12 dias','boleta','EFECTIVO',NULL),(31,'2020-08-14 19:04:22','CONTRATADO','18','50','129.8','1','110','110','','','','','','','','','','','','',1,1,5,NULL,NULL,NULL,NULL,'1 mes','boleta','EFECTIVO',NULL),(32,'2020-08-14 19:09:11','CONTRATADO','18','100','290.28','2','110','220','2','13','26','','','','','','','','','',1,1,5,7,NULL,NULL,NULL,'1 mes','boleta','EFECTIVO',NULL),(33,'2020-08-14 21:02:54','CONTRATADO','18','10','25.96','2','11','22','','','','','','','','','','','','',1,1,17,NULL,NULL,NULL,NULL,'10 dias','boleta','EFECTIVO',NULL),(34,'2020-08-14 21:03:30','COMPLETADO','18','15','38.94','3','11','33','','','','','','','','','','','','',1,1,17,NULL,NULL,NULL,NULL,'sda','dsadasd','EFECTIVO',NULL);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-04  0:58:18
