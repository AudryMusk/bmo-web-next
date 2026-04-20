-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: bmo_cms
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Article`
--

DROP TABLE IF EXISTS `Article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Article` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `status` enum('brouillon','publie','planifie') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'brouillon',
  `author` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorAvatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `readTime` int NOT NULL DEFAULT '1',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` json NOT NULL,
  `metaTitle` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metaDescription` text COLLATE utf8mb4_unicode_ci,
  `publishedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Article_slug_key` (`slug`),
  KEY `Article_categoryId_fkey` (`categoryId`),
  KEY `Article_userId_fkey` (`userId`),
  CONSTRAINT `Article_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Article_chk_1` CHECK (json_valid(`content`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Article`
--

LOCK TABLES `Article` WRITE;
/*!40000 ALTER TABLE `Article` DISABLE KEYS */;
INSERT INTO `Article` VALUES ('cmmm630t40005pinvdiwpxx6z','Signature d accord de partenariat entre NSIA Asset Management et Bestcash','signature-d-accord-de-partenariat-entre-nsia-asset-management-et-bestcash',NULL,'publie','Admin',NULL,'2026-03-11 15:01:36.088',1,'/uploads/1773241296081-1ue0n4pb2gmj.jpeg','\"<p>Ce jeudi 05 mars 2026, la direction générale de NSIA Asset Management scelle un partenariat avec Bestcash Money au siège de l\'agence NSIA Assurance de Saint Michel à Cotonou !<br><br>Un moment fort pour l’écosystème financier béninois : Une alliance qui promet de booster les services financiers et de créer de nouvelles opportunités locales.</p><p></p><p><img src=\\\"/uploads/editor-1773241279789-focm9yxn1i7.jpg\\\"><br><br>Nous vous revenons pour les temps forts de cette cérémonie riche en perspective !<br><br><strong>#NSIAAssetManagement #BestcashMoney #BeninBouge</strong></p>\"',NULL,NULL,NULL,'2026-03-11 15:01:36.088','2026-03-13 12:45:39.785','cmmah10ho0002sbm4g6tlq2l4',NULL);
/*!40000 ALTER TABLE `Article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#2563EB',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`),
  UNIQUE KEY `Category_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES ('cmmah10hj0001sbm4d61ryk4a','Guides','guides','Guides et tutoriels','#059669','2026-03-03 10:34:44.023','2026-03-03 10:34:44.023'),('cmmah10ho0002sbm4g6tlq2l4','Partenariats','partenariats','Nos partenariats','#D97706','2026-03-03 10:34:44.029','2026-03-03 10:34:44.029'),('cmmah10hu0003sbm44aw8cyis','Innovation','innovation','Innovations technologiques','#7C3AED','2026-03-03 10:34:44.034','2026-03-03 10:34:44.034'),('cmmah10hx0004sbm4yplios6o','Événements','evenements','Événements et actualités','#DC2626','2026-03-03 10:34:44.037','2026-03-03 10:34:44.037'),('cmmah10i80006sbm4nn9n2p6i','Produit','produit','Stratégie produit, roadmap et vision.','#D97706','2026-03-03 10:34:44.049','2026-03-03 10:34:44.049'),('cmmah10ib0007sbm4haqssj5j','Design','design','UI/UX, systèmes de design et esthétique.','#7C3AED','2026-03-03 10:34:44.052','2026-03-03 10:34:44.052'),('cmmah10if0008sbm4egtlevxi','Marketing','marketing','Croissance, SEO et stratégies de contenu.','#059669','2026-03-03 10:34:44.056','2026-03-03 10:34:44.056');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContactForm`
--

DROP TABLE IF EXISTS `ContactForm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactForm` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactForm`
--

LOCK TABLES `ContactForm` WRITE;
/*!40000 ALTER TABLE `ContactForm` DISABLE KEYS */;
INSERT INTO `ContactForm` VALUES ('cmmoozzhm000011gm57v5dgul','Boussari','Habib','boussarihabib77@gmail.com','0140195738','Je n\'ai pas reçu mon code pin après la création de mon compte bestcash','Je n\'ai pas reçu mon code pin après la création de mon compte bestcash','2026-03-13 09:26:39.465'),('cmmp8umg2000047d9nth886sp','Gilbert','Houedanou','houdanouluc@gmail.com','+2207771258','Plus d\'infos sur votre application','Aider moi \r\nJe veux savoir si l\'application B-Mo est seulement utile pour les pays qui utilise le CFA ou bien tout autre pays comme la Gambie qui utilise la dallassi\r\nMerci d\'avance pour votre réponse','2026-03-13 18:42:21.602'),('cmmubip29000147d9tqkgnjrc','Yaovi','Akakpo','extymayao20@gmail.com','2290197636624','Transaction internationale','Peut on faire des transactions sur des plates formes comme alibaba','2026-03-17 07:55:54.847'),('cmn44u8gn0000kor5lox5kps9','EVIENS','Celucien','epcelux@gmail.com','+441590473001','services & Assistance: America','Hello,\r\nI\'m a client Of Bank UBA-BCM\r\nCEO EVIENS Celucien.','2026-03-24 04:46:37.655'),('cmnoldivb0000b6kk1ckomlvy','SEMBIÉNI ROMAIN','GNANRIGO','gnanrigofficiel@gmail.com','0140920092','Activation de compte','Mon compte avait été désactivé. Malgré mon message à un agent, rien n\'y fit.','2026-04-07 12:24:54.980');
/*!40000 ALTER TABLE `ContactForm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GabAtm`
--

DROP TABLE IF EXISTS `GabAtm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GabAtm` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GabAtm`
--

LOCK TABLES `GabAtm` WRITE;
/*!40000 ALTER TABLE `GabAtm` DISABLE KEYS */;
INSERT INTO `GabAtm` VALUES ('cmmah11190035sbm440t2v5q1','Cotonou','Agence Principale ATM 1 - Carrefour Trois Banques',NULL,NULL,NULL,NULL,0),('cmmah111j0037sbm4rdkkrkww','Cotonou','Agence Principale ATM 2',NULL,NULL,NULL,NULL,2),('cmmah111m0038sbm4t1yk4tg7','Cotonou','Fidjrossè ATM 2',NULL,NULL,NULL,NULL,3),('cmmah111q0039sbm4i5kg0yqd','Cotonou','Commissariat Central - Bénin Petro',NULL,NULL,NULL,NULL,4),('cmmah111t003asbm4xlunt51l','Cotonou','Patte d\'Oie',NULL,NULL,NULL,NULL,5),('cmmah111x003bsbm4nfqxtbxu','Cotonou','Agence Dantokpa ATM',NULL,NULL,NULL,NULL,6),('cmmah1120003csbm476zu3xe1','Cotonou','Erevan',NULL,NULL,NULL,NULL,7),('cmmah1124003dsbm4kr3dypem','Cotonou','CABI SCBERMAP',NULL,NULL,NULL,NULL,8),('cmmah1127003esbm4erycblkw','Cotonou','Patte d\'Oie ATM',NULL,NULL,NULL,NULL,9),('cmmah112a003fsbm4n3pa5gy7','Cotonou','GAB Jéricho Dantokpa',NULL,NULL,NULL,NULL,10),('cmmah112e003gsbm4daldrfxv','Cotonou','Stade de l\'Amitié',NULL,NULL,NULL,NULL,11),('cmmah112h003hsbm41w84kj6l','Cotonou','Abattoir ATM 1 - Face Imprimerie Toundé',NULL,NULL,NULL,NULL,12),('cmmah112l003isbm4470388jk','Cotonou','Houdegbé ATM 2',NULL,NULL,NULL,NULL,13),('cmmah112o003jsbm4bwds2nj2','Fidjrosse','Fidjrosse Plage',NULL,NULL,NULL,NULL,14),('cmmah112s003ksbm4bbse5cnq','Bohicon','Bohicon ATM 1 - Quartier Gankon',NULL,NULL,NULL,NULL,15),('cmmah112v003lsbm4xb5g0jft','Zogbodomey','GAB Nocibe Massi',NULL,NULL,NULL,NULL,16),('cmmah112z003msbm4pvtqq15d','Ouidah','Ouidah ATM',NULL,NULL,NULL,NULL,17),('cmmah1132003nsbm4gbs6tqac','Comé','Comé Branch - Quartier Hongodé',NULL,NULL,NULL,NULL,18),('cmmah1136003osbm4xbx4cpcx','Porto-Novo','Porto-Novo ATM 1 - Face Toffa',NULL,NULL,NULL,NULL,19),('cmmah1139003psbm4879mmxlw','Parakou','Parakou ATM 1 - Banikouara',NULL,NULL,NULL,NULL,20),('cmmah113d003qsbm4j634bk2t','Parakou','Université de Parakou',NULL,NULL,NULL,NULL,21);
/*!40000 ALTER TABLE `GabAtm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InternationalCountry`
--

DROP TABLE IF EXISTS `InternationalCountry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InternationalCountry` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InternationalCountry`
--

LOCK TABLES `InternationalCountry` WRITE;
/*!40000 ALTER TABLE `InternationalCountry` DISABLE KEYS */;
INSERT INTO `InternationalCountry` VALUES ('cmmey04b30000lffi4e4cxxuv','États-Unis',0),('cmmey04b60001lffie5e5ct0n','Europe',1),('cmmey04bc0002lffimd16orci','Canada',2),('cmmey04bg0003lffiu0e650e1','Inde',3),('cmmey04bi0004lffiprkwl6xt','Royaume-Uni',4),('cmmey04bm0005lffia64gat0u','Émirats Arabes Unis',5),('cmmey04bp0006lffi78s53fzy','Nigeria',6),('cmmey04bs0007lffip1x3ltfq','Cameroun',7),('cmmf0tl1l0000u7z2o3xd7cn8','Espagne',8),('cmmf0tzsv0001u7z2tjhu4q6x','RDC',9);
/*!40000 ALTER TABLE `InternationalCountry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Marchand`
--

DROP TABLE IF EXISTS `Marchand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Marchand` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Bénin',
  `department` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Marchand_token_key` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Marchand`
--

LOCK TABLES `Marchand` WRITE;
/*!40000 ALTER TABLE `Marchand` DISABLE KEYS */;
INSERT INTO `Marchand` VALUES ('cmmah110d002xsbm4rnh4gu2z','SAK-SERVICES','01 97 70 73 73','Bénin',NULL,'Godomey Togoudo - Allegléta - Womey',6.3509,2.3478,'982W+8WH, Cotonou, Benin','/uploads/1776360650269-zq4qc2rpxr.png',NULL,0,'',1,'cmmah110d002xsbm4rnh4gu2z'),('cmmah110i002ysbm46l4tooge','RÈGNE DE L\'ÉTERNEL','01 97 33 95 23','Bénin',NULL,'Porto-Novo',6.350954243303118,2.347854639271923,'982W+8WH, Cotonou, Benin','/uploads/1776444018867-pbcupj0ltwm.jpg',NULL,1,'',1,'cmmah110i002ysbm46l4tooge'),('cmmah110n002zsbm4c43g6lmt','NETSHOP','01 96 73 92 72 / 01 96 20 92 09','Bénin',NULL,'Ikpinlè Tankpè - Parana - Bidossessi - Sos - Ganvié',NULL,NULL,NULL,NULL,NULL,2,'',1,'cmmah110n002zsbm4c43g6lmt'),('cmmah110q0030sbm4xue6sd7a','ALAKHBAAR SERVICE','01 97 97 02 91 / 01 90 56 56 56','Bénin',NULL,'1er - 4ième arrondissement',NULL,NULL,NULL,NULL,NULL,3,'',1,'cmmah110q0030sbm4xue6sd7a'),('cmmah110u0031sbm4jcjqbgim','EXPERT COMMUNICATION','01 96 64 92 83','Bénin',NULL,'Aguégué - Adjohoun - Dangbo - Bonou - Akpro Missérété - Adjarra - Avrankou',NULL,NULL,NULL,NULL,NULL,4,'',1,'cmmah110u0031sbm4jcjqbgim'),('cmmah110x0032sbm4sg9dywtc','DON DE DIEU SALEM','01 97 27 67 91','Bénin',NULL,'Glo - Zè - Tori - Allada - Toffo',NULL,NULL,NULL,NULL,NULL,5,'',1,'cmmah110x0032sbm4sg9dywtc'),('cmmah11110033sbm4ssvkibov','KR BUSINESS CENTER','01 97 35 49 46','Bénin',NULL,'Parakou - Tchaourou',NULL,NULL,NULL,NULL,NULL,6,'',1,'cmmah11110033sbm4ssvkibov'),('cmmah11140034sbm4ahlkbum4','NOUROU DISTRIBUTION & SERVICES','01 44 71 74 88 / 01 95 77 86 61','Bénin',NULL,'Natitingou',NULL,NULL,NULL,NULL,NULL,7,'',1,'cmmah11140034sbm4ahlkbum4'),('cmo1x27rc000056v13kc11zqd','Yaggss','458118548404','Bénin','Borgou','Bouka',6.351042172457316,2.347740548418598,'982W+8WH, Cotonou, Benin','/uploads/1776370382366-q3rxfnu3dio.jpg',NULL,8,'',0,'cmo1x27rc000056v13kc11zqd'),('cmo2nm5zt0000w1j6m5jsg013','Ifkckclffk','5464343434343','Bénin','Borgou','Dérassi',6.427675758004671,2.345206677001177,'C8HW+96Q, Abomey Calavi, Benin','/uploads/1776414983142-vv7zd7bqp9o.jpg',NULL,9,'',1,'cmo2nm5zt0000w1j6m5jsg013');
/*!40000 ALTER TABLE `Marchand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Microfinance`
--

DROP TABLE IF EXISTS `Microfinance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Microfinance` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agencies` int NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Microfinance_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Microfinance`
--

LOCK TABLES `Microfinance` WRITE;
/*!40000 ALTER TABLE `Microfinance` DISABLE KEYS */;
INSERT INTO `Microfinance` VALUES ('cmmah10zo002qsbm4p4387dyk','AFRICA FINANCES',13,NULL,NULL,NULL,NULL,0),('cmmah10zr002rsbm4zq3r1klp','COWEC',13,NULL,NULL,NULL,NULL,1),('cmmah10zw002ssbm4a6259xfv','COMUBA',28,NULL,NULL,NULL,NULL,2),('cmmah10zy002tsbm47ba21fgj','MDB',4,NULL,6.3509,2.3478,'982W+8WH, Cotonou, Benin',3),('cmmah1101002usbm41jtp9d74','SIAN\'SON',30,NULL,NULL,NULL,NULL,4),('cmmah1104002vsbm48kwhkire','RENACA',39,NULL,NULL,NULL,NULL,5),('cmmah1106002wsbm4n8pe5f90','LE DEFIS',14,NULL,NULL,NULL,NULL,6);
/*!40000 ALTER TABLE `Microfinance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Partner`
--

DROP TABLE IF EXISTS `Partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Partner` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Partner_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Partner`
--

LOCK TABLES `Partner` WRITE;
/*!40000 ALTER TABLE `Partner` DISABLE KEYS */;
INSERT INTO `Partner` VALUES ('cmmah113g003rsbm4gc0bqad3','UBA','Banque','Africa\'s Global Bank - Partenaire bancaire principal',NULL,NULL,NULL,NULL,0),('cmmah113l003ssbm4iaydfa8b','BCEAO','Régulateur','Banque Centrale des États de l\'Afrique de l\'Ouest',NULL,NULL,NULL,NULL,1),('cmmah113q003tsbm4cz6o49ls','TERRA PAY','Transfert','Partenaire transfert international',NULL,NULL,NULL,NULL,2),('cmmah113u003usbm4e5i2ub0j','AGL','Logistique','Africa Global Logistics',NULL,NULL,NULL,NULL,3),('cmmah113w003vsbm4rsirrt7u','CANAL+','Médias','Partenaire réabonnement TV',NULL,NULL,NULL,NULL,4),('cmmah1140003wsbm4pft7sqb7','SBEE','Énergie','Société Béninoise d\'Énergie Électrique',NULL,NULL,NULL,NULL,5),('cmmah1144003xsbm40rfoygdu','CMA CGM','Maritime','Partenaire paiement transitaires',NULL,NULL,NULL,NULL,6),('cmmah1147003ysbm4b5ghd9no','UNICEF','Institution','Fonds des Nations Unies pour l\'enfance',NULL,NULL,NULL,NULL,7),('cmmah1149003zsbm413x5vy62','MFS','Fintech','Mobile Financial Services',NULL,NULL,NULL,NULL,8),('cmmah114c0040sbm4tpu80tfa','ONAFRIQ','Fintech','Réseau de paiement africain',NULL,NULL,NULL,NULL,9),('cmmah114f0041sbm4439wx64c','APSFD','Association','Association Professionnelle des Systèmes Financiers Décentralisés',NULL,NULL,NULL,NULL,10);
/*!40000 ALTER TABLE `Partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Service` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serviceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('particulier','business') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `features` json DEFAULT NULL,
  `ussdSteps` json DEFAULT NULL,
  `appSteps` json DEFAULT NULL,
  `characteristics` json DEFAULT NULL,
  `advantages` json DEFAULT NULL,
  `useCases` json DEFAULT NULL,
  `steps` json DEFAULT NULL,
  `linkingMethods` json DEFAULT NULL,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Service_serviceId_key` (`serviceId`),
  CONSTRAINT `Service_chk_1` CHECK (json_valid(`features`)),
  CONSTRAINT `Service_chk_2` CHECK (json_valid(`ussdSteps`)),
  CONSTRAINT `Service_chk_3` CHECK (json_valid(`appSteps`)),
  CONSTRAINT `Service_chk_4` CHECK (json_valid(`characteristics`)),
  CONSTRAINT `Service_chk_5` CHECK (json_valid(`advantages`)),
  CONSTRAINT `Service_chk_6` CHECK (json_valid(`useCases`)),
  CONSTRAINT `Service_chk_7` CHECK (json_valid(`steps`)),
  CONSTRAINT `Service_chk_8` CHECK (json_valid(`linkingMethods`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

LOCK TABLES `Service` WRITE;
/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
INSERT INTO `Service` VALUES ('cmmah10xs0012sbm4kz5ja9yj','transfers','particulier','Transferts','ArrowLeftRight','Envoyez de l\'argent vers tous les portefeuilles Mobile Money et comptes B-MO','[\"Vers MTN MoMo\", \"Vers Moov Money\", \"Vers Celtiis Cash\", \"Vers compte B-MO\", \"Transfert planifié\", \"Transfert planifiéFFF\"]','[\"Tapez *890#\", \"Sélectionnez 1 - Client\", \"Choisissez Transferts\", \"Sélectionnez le type de transfert\", \"Entrez le numéro du bénéficiaire\", \"Saisissez le montant\", \"Validez avec votre code PIN\"]','[\"Connectez-vous à l\'application B-MO\", \"Cliquez sur Transferts\", \"Choisissez Wallet Mobile puis National\", \"Saisissez le numéro du bénéficiaire\", \"Entrez le montant, nom et prénom du bénéficiaire\", \"Choisissez la raison du transfert\", \"Validez avec votre code PIN\"]',NULL,NULL,NULL,NULL,NULL,NULL,0),('cmmah10xw0013sbm45zg8s3x4','bills','particulier','Paiement Factures','Receipt','Payez vos factures SBEE et réabonnements Canal+ en toute simplicité','[\"Facture SBEE Prépayée\", \"Facture SBEE Postpayée\", \"Réabonnement Canal+\"]','[\"Composez *890#\", \"Sélectionnez 1 - Client\", \"Rendez-vous dans le menu 7 - Facture\", \"Sélectionnez: 1 - Prépayé SBEE ou 2 - Postpayé SBEE\", \"Renseignez les informations du compteur\", \"Entrez votre mot de passe pour valider\"]','[\"Connectez-vous à l\'application B-MO\", \"Cliquez sur Factures SBEE\", \"Saisissez le numéro de compteur et le montant\", \"Faites le récapitulatif et confirmez\", \"Entrez votre code PIN pour valider\"]',NULL,NULL,NULL,NULL,NULL,NULL,1),('cmmah10y20014sbm4ak45k53w','airtime','particulier','Crédits & Forfaits','Wifi','Achetez du crédit de communication et des forfaits internet sur tous les réseaux','[\"Crédit d\'appel MTN/Moov/Celtiis\", \"Forfait Internet\", \"Forfait Mixte\", \"Achat pour soi-même ou pour un tiers\"]','[\"Composez *890#\", \"Sélectionnez 1 - Client\", \"Choisissez 5 - Crédit/Forfait\", \"Sélectionnez le type (Crédit, Forfait, Mixte)\", \"Choisissez Pour moi-même ou Pour un tiers\", \"Sélectionnez l\'offre souhaitée\", \"Saisissez votre mot de passe pour valider\"]','[\"Connectez-vous à l\'application B-MO\", \"Cliquez sur Crédits et Forfaits\", \"Choisissez le type (Crédit d\'appel, Forfait internet, Mixte)\", \"Sélectionnez le bénéficiaire\", \"Choisissez l\'offre et validez avec votre code PIN\"]',NULL,NULL,NULL,NULL,NULL,NULL,2),('cmmah10y50015sbm4anq9jq0q','withdrawal','particulier','Retrait GAB UBA','Banknote','Retirez de l\'argent aux guichets automatiques UBA partout au Bénin','[\"Retrait sans carte bancaire\", \"Code ATM à 6 chiffres\", \"30+ GAB disponibles\"]','[\"Tapez *890#\", \"Choisissez 1 - Client\", \"Sélectionnez 8 - Retrait GAB\", \"Mettez le montant et un code à 4 chiffres de votre choix\", \"Cliquez sur Générer puis entrez votre code PIN\", \"Recevez par SMS le code ATM à 6 chiffres\", \"Allez au guichet, choisissez Retrait Mobile Money\", \"Entrez le code ATM et le montant, validez\"]','[\"Connectez-vous à l\'application B-MO\", \"Cliquez sur Transfert\", \"Sélectionnez Retrait ATM\", \"Entrez le montant souhaité\", \"Générez le code ATM\", \"Présentez-vous au GAB UBA avec le code reçu\"]',NULL,NULL,NULL,NULL,NULL,NULL,3),('cmmah10y80016sbm4oum4fhvx','pushpull','particulier','Push & Pull Bancaire','ArrowUpDown','Transférez des fonds entre votre compte B-MO et votre compte UBA ou carte prépayée','[\"Virement de UBA vers B-MO (Pull)\", \"Virement de B-MO vers UBA (Push)\", \"Liaison compte bancaire\", \"Liaison carte prépayée\"]',NULL,NULL,NULL,NULL,NULL,NULL,'{\"manual\": {\"steps\": [\"Rendez-vous dans une agence UBA\", \"Munissez-vous d\'une pièce d\'identité valide\", \"Remplissez le formulaire de souscription auprès du CSO\"], \"title\": \"Liaison Manuelle\", \"description\": \"En agence, pour les utilisateurs avec un numéro B-MO différent\"}, \"automatic\": {\"steps\": [\"Connectez-vous à l\'application B-MO\", \"Cliquez sur Transferts\", \"Cliquez sur Push & Pull\", \"Cliquez sur Liaison de compte bancaire et carte prépayée\", \"Cochez Compte bancaire ou Carte prépayée\", \"Renseignez votre numéro de compte ou identifiant client\", \"Entrez les 4 derniers chiffres de votre carte prépayée\"], \"title\": \"Liaison Automatique\", \"description\": \"Pour les utilisateurs ayant le même numéro B-MO que celui associé au compte UBA\"}}',NULL,4),('cmmah10yc0017sbm48eagfpvq','international','particulier','Transfert International','Globe','Recevez des fonds depuis Western Union, MoneyGram et autres services internationaux','[\"Réception Western Union\", \"Réception MoneyGram\", \"Zone UEMOA\", \"Zone CEMAC\", \"International (USA, Europe, Canada, Inde, UK, Émirats, Nigeria, Cameroun)\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),('cmmah10yf0018sbm4c1ueqhdk','mass-payment','business','Paiement de Masse','Users','Transférez directement les fonds vers les comptes B-MO de vos bénéficiaires',NULL,NULL,NULL,'[\"Paiement instantané en temps réel\", \"Accessible via application et USSD (*890#)\", \"Sécurisé et traçable\", \"Flexibilité d\'utilisation (paiements, retraits, transferts)\"]','[\"Paiement instantané et accessible partout\", \"Solution digitale sans manipulation d\'espèces\", \"Traçabilité complète et meilleure gestion comptable\", \"Adapté aux travailleurs, étudiants, retraités et prestataires\", \"Automatisation réduisant les charges administratives\", \"Gain de temps et réduction des coûts\"]','[\"Salaires des employés\", \"Bourses étudiantes\", \"Pensions retraités\", \"Paiement des prestataires\"]',NULL,NULL,NULL,0),('cmmah10yj0019sbm40dc8edjh','collection','business','Collecte B-MO Pay','Wallet','Solution sécurisée pour collecter les paiements de vos clients et membres',NULL,NULL,NULL,'[\"Technologie avancée et sécurisée\", \"Collecte fluide et transparente\", \"Rapidité dans le traitement des transactions\"]',NULL,NULL,'[\"Connectez-vous à votre compte partenaire B-MO\", \"Cliquez sur B-MO Pay\", \"Saisissez le numéro collect\", \"Entrez l\'agence collect\", \"Entrez le nom du déposant\", \"Sélectionnez le motif\", \"Sélectionnez le type de pièces\", \"Entrez le numéro de la pièce et sa date d\'expiration\", \"Cliquez sur ajouter un produit\", \"Entrez le(s) produit et le(s) montant puis validez\"]',NULL,NULL,1),('cmmah10ym001asbm4nfxzxtl3','tpe','business','TPE B-MO','CreditCard','Terminaux de paiement électronique pour les marchands B-MO','[\"Services à valeur ajoutée\", \"Collecte des paiements\", \"Commissions sur transactions\", \"Compatible avec tous les terminaux acceptant les cartes bancaires\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'FEITIAN F20',2),('cmmah10yp001bsbm4e5thr8pz','university','business','Inscription Universitaire','GraduationCap','Paiement sécurisé des droits d\'inscription universitaire','[\"Paiement sécurisé\", \"Expérience fluide\", \"Sans tracas pour les étudiants\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3),('cmmah10ys001csbm40lu7kad0','cmacgm','business','Paiement CMACGM','Ship','Solution pour les transitaires pour payer leurs factures dans la caisse CMACGM','[\"Paiement simplifié\", \"Sécurisé\", \"Intégration caisse CMACGM\"]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4),('cmmah10yv001dsbm4srfkr77z','scheduled','business','Transfert Planifié','Calendar','Automatisez vos paiements réguliers et à échéances spécifiques',NULL,NULL,NULL,NULL,NULL,'[\"Loyer mensuel\", \"Abonnements\", \"Frais de scolarité\", \"Paiements récurrents\"]',NULL,NULL,NULL,5);
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TariffMeta`
--

DROP TABLE IF EXISTS `TariffMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TariffMeta` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TariffMeta_region_key` (`region`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TariffMeta`
--

LOCK TABLES `TariffMeta` WRITE;
/*!40000 ALTER TABLE `TariffMeta` DISABLE KEYS */;
INSERT INTO `TariffMeta` VALUES ('cmmah10z1001esbm4ef7p39yf','uemoa','Grille Tarifaire UEMOA','Frais pour les transferts et retraits dans la zone UEMOA',NULL),('cmmah10z7001ssbm4fa3g67y7','senegal','Grille Tarifaire Sénégal','Frais pour les envois vers le Sénégal',NULL),('cmmah10zd0025sbm4s149m055','cemac','Grille Tarifaire CEMAC','Frais pour les envois vers la zone CEMAC',NULL),('cmmah10zi002hsbm4403mowfq','mobile','Transfert Mobile Money','Frais pour les transferts entre B-MO et les autres réseaux Mobile Money',NULL),('cmmah10zm002psbm4a1mxt0gv','international','Transferts Internationaux','Destinations: États-Unis, Europe, Canada, Inde, Royaume-Uni, Émirats Arabes Unis, Nigeria, Cameroun','Contactez-nous pour les tarifs spécifiques par destination');
/*!40000 ALTER TABLE `TariffMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TariffRow`
--

DROP TABLE IF EXISTS `TariffRow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TariffRow` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `min` double NOT NULL,
  `max` double DEFAULT NULL,
  `fraisRetrait` double DEFAULT NULL,
  `fraisEnvoi` double DEFAULT NULL,
  `minEnvoi` double DEFAULT NULL,
  `maxEnvoi` double DEFAULT NULL,
  `frais` double DEFAULT NULL,
  `fraisBmoVersAutres` double DEFAULT NULL,
  `fraisAutresVersBmo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `tariffMetaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TariffRow_tariffMetaId_fkey` (`tariffMetaId`),
  CONSTRAINT `TariffRow_tariffMetaId_fkey` FOREIGN KEY (`tariffMetaId`) REFERENCES `TariffMeta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TariffRow`
--

LOCK TABLES `TariffRow` WRITE;
/*!40000 ALTER TABLE `TariffRow` DISABLE KEYS */;
INSERT INTO `TariffRow` VALUES ('cmmah10z1001fsbm4w9w4eju3',1,1000,40,150,1,5000,NULL,NULL,NULL,0,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z1001gsbm4x0k795x6',501,5000,95,350,5001,20000,NULL,NULL,NULL,1,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z1001hsbm4e723q6mm',5001,10000,170,750,20001,50000,NULL,NULL,NULL,2,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z1001isbm471r4cpr5',10001,20000,325,1000,50001,75000,NULL,NULL,NULL,3,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z1001jsbm47pcivvt4',20001,50000,650,1300,75001,100000,NULL,NULL,NULL,4,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z2001ksbm4hhd1ostq',50001,100000,950,1800,100001,200000,NULL,NULL,NULL,5,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z2001lsbm4ggwjozeb',100001,200000,1900,2800,200001,300000,NULL,NULL,NULL,6,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z2001msbm43cu5ehib',200001,300000,2800,3500,300001,400000,NULL,NULL,NULL,7,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z2001nsbm4ntfnhev4',300001,500000,3250,4000,400001,500000,NULL,NULL,NULL,8,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z2001osbm4003k812m',500001,750000,4500,5800,500001,750000,NULL,NULL,NULL,9,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z2001psbm4hmomurlz',750001,1000000,5500,10000,750001,1500000,NULL,NULL,NULL,10,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z2001qsbm47wt7xgtc',1000001,1500000,7500,13000,1500001,2000000,NULL,NULL,NULL,11,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z2001rsbm43li8mpul',1500001,2000000,8000,NULL,NULL,NULL,NULL,NULL,NULL,12,'cmmah10z1001esbm4ef7p39yf'),('cmmah10z7001tsbm4dl74445i',1,5000,NULL,1200,1,20000,200,NULL,NULL,0,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z7001usbm4uj8z3upr',5001,20000,NULL,NULL,NULL,NULL,300,NULL,NULL,1,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z7001vsbm43wk9sytr',20001,50000,NULL,1500,20001,50000,750,NULL,NULL,2,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z7001wsbm4s9jxpjuu',50001,75000,NULL,2000,50001,100000,1125,NULL,NULL,3,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z7001xsbm4lqsan8kl',75001,100000,NULL,2500,100001,200000,1500,NULL,NULL,4,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z7001ysbm425giyrhj',100001,200000,NULL,5000,200001,500000,3000,NULL,NULL,5,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z7001zsbm4otxw17a7',200001,300000,NULL,6000,500001,750000,4000,NULL,NULL,6,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z70020sbm46f8dl05r',300001,400000,NULL,NULL,NULL,NULL,6500,NULL,NULL,7,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z70021sbm4biyfbzkx',400001,500000,NULL,7500,750001,1000000,7500,NULL,NULL,8,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z70022sbm4a964dqpo',500001,750000,NULL,8500,1000001,1500000,11250,NULL,NULL,9,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z70023sbm4xuscfpcz',750001,1500000,NULL,NULL,NULL,NULL,22500,NULL,NULL,10,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10z70024sbm465ke7x67',1500001,2000000,NULL,10000,1500001,2000000,30000,NULL,NULL,11,'cmmah10z7001ssbm4fa3g67y7'),('cmmah10zd0026sbm4d16wuwge',1,20000,NULL,1200,NULL,NULL,NULL,NULL,NULL,0,'cmmah10zd0025sbm4s149m055'),('cmmah10zd0027sbm45o9kfuwx',20001,50000,NULL,2000,NULL,NULL,NULL,NULL,NULL,1,'cmmah10zd0025sbm4s149m055'),('cmmah10zd0028sbm48ggrgd3n',50001,100000,NULL,2500,NULL,NULL,NULL,NULL,NULL,2,'cmmah10zd0025sbm4s149m055'),('cmmah10zd0029sbm45v23w22y',100001,200000,NULL,3500,NULL,NULL,NULL,NULL,NULL,3,'cmmah10zd0025sbm4s149m055'),('cmmah10zd002asbm4p5wtt50v',200001,300000,NULL,4000,NULL,NULL,NULL,NULL,NULL,4,'cmmah10zd0025sbm4s149m055'),('cmmah10zd002bsbm40qpt3zqv',300001,400000,NULL,4500,NULL,NULL,NULL,NULL,NULL,5,'cmmah10zd0025sbm4s149m055'),('cmmah10zd002csbm4rsaoeync',400001,500000,NULL,5000,NULL,NULL,NULL,NULL,NULL,6,'cmmah10zd0025sbm4s149m055'),('cmmah10zd002dsbm4o41nydc0',500001,750000,NULL,6500,NULL,NULL,NULL,NULL,NULL,7,'cmmah10zd0025sbm4s149m055'),('cmmah10zd002esbm4qq91o7l7',750001,1000000,NULL,7500,NULL,NULL,NULL,NULL,NULL,8,'cmmah10zd0025sbm4s149m055'),('cmmah10zd002fsbm4o4qncwre',1000001,1500000,NULL,8500,NULL,NULL,NULL,NULL,NULL,9,'cmmah10zd0025sbm4s149m055'),('cmmah10zd002gsbm4qv0tgf82',1500001,2000000,NULL,10000,NULL,NULL,NULL,NULL,NULL,10,'cmmah10zd0025sbm4s149m055'),('cmmah10zi002isbm4e2g5kq8f',1,2000,NULL,NULL,NULL,NULL,NULL,200,NULL,0,'cmmah10zi002hsbm4403mowfq'),('cmmah10zi002jsbm40vapneru',2001,5000,NULL,NULL,NULL,NULL,NULL,225,NULL,1,'cmmah10zi002hsbm4403mowfq'),('cmmah10zi002ksbm43ze16gc5',5001,40000,NULL,NULL,NULL,NULL,NULL,300,'0,2%',2,'cmmah10zi002hsbm4403mowfq'),('cmmah10zi002lsbm4p8e2l1qt',40001,75000,NULL,NULL,NULL,NULL,NULL,350,NULL,3,'cmmah10zi002hsbm4403mowfq'),('cmmah10zi002msbm4m8ke8tk2',75001,400000,NULL,NULL,NULL,NULL,NULL,400,NULL,4,'cmmah10zi002hsbm4403mowfq'),('cmmah10zi002nsbm4o8zxjxid',400001,1000000,NULL,NULL,NULL,NULL,NULL,450,NULL,5,'cmmah10zi002hsbm4403mowfq'),('cmmah10zi002osbm419tuh9au',1000001,2000000,NULL,NULL,NULL,NULL,NULL,500,NULL,6,'cmmah10zi002hsbm4403mowfq');
/*!40000 ALTER TABLE `TariffRow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('cmmah10w70009sbm4wqgzllr9','admin@bmo.com','$2b$12$pygyKTKe8i.BStJnzsuxyO8e0.n68fm.avK6LbbD/fSpNG4LS79de','Admin B-MO','2026-03-03 10:34:44.552','2026-03-03 10:34:44.552');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('733736d4-2540-46e9-8344-a32ca22e1cf8','4f4af7923c4a2ae325bdcd14b3d8153e793d2f2863e606a1b175147398ac7dc5','2026-03-10 11:32:08.432','20260310113208_init',NULL,NULL,'2026-03-10 11:32:08.364',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-17 19:03:08
