-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: rds-mysql-pmood.chsg60yu0pok.eu-west-2.rds.amazonaws.com    Database: rds-mysql-pmood
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(25) NOT NULL,
  `date_of_birth` date NOT NULL,
  `pregnancy_status` varchar(10) NOT NULL,
  `due_date` date,
  `date_completed` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_profile_user_id_idx` (`user_id`),
  CONSTRAINT `user_profile_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delay_discounting`
--

DROP TABLE IF EXISTS `delay_discounting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `delay_discounting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `test_number` int NOT NULL,
  `trial_number` int NOT NULL,
  `now_value` varchar(10) NOT NULL,
  `later_time_frame` varchar(25) NOT NULL,
  `user_choice` varchar(6) NOT NULL,
  `date_completed` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `delay_discounting_user_id_idx` (`user_id`),
  CONSTRAINT `delay_discounting_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `effort_expenditure`
--

DROP TABLE IF EXISTS `effort_expenditure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `effort_expenditure` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `trial_number` int NOT NULL,
  `win_probability` double NOT NULL,
  `user_choice` varchar(10) NOT NULL,
  `hard_task_points` int NOT NULL,
  `task_completed` tinyint NOT NULL,
  `points_won` tinyint NOT NULL,
  `date_completed` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `effort_expenditure_user_id_idx` (`user_id`),
  CONSTRAINT `effort_expenditure_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emotion_sensitivity`
--

DROP TABLE IF EXISTS `emotion_sensitivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `emotion_sensitivity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `hit_rate` double NOT NULL,
  `false_alarm_rate` double NOT NULL,
  `miss_count` double NOT NULL,
  `date_completed` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `emotion_sensitivity_user_id_idx` (`user_id`),
  CONSTRAINT `emotion_sensitivity_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `memory_recall`
--

DROP TABLE IF EXISTS `memory_recall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `memory_recall` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `number_of_words_remembered` int NOT NULL,
  `number_of_positive_words_remembered` int NOT NULL,
  `number_of_negative_words_remembered` int NOT NULL,
  `date_completed` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `memory_recall_user_id_idx` (`user_id`),
  CONSTRAINT `memory_recall_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mobility_tracking`
--

DROP TABLE IF EXISTS `mobility_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `mobility_tracking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `longitude` decimal(20,17) NOT NULL,
  `latitude` decimal(20,17) NOT NULL,
  `timestamp` datetime NOT NULL,
  `date_completed` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `mobility_tracking_user_id_idx` (`user_id`),
  CONSTRAINT `mobility_tracking_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `panas`
--

DROP TABLE IF EXISTS `panas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `panas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `interested` int NOT NULL,
  `distressed` int NOT NULL,
  `excited` int NOT NULL,
  `upset` int NOT NULL,
  `strong` int NOT NULL,
  `guilty` int NOT NULL,
  `scared` int NOT NULL,
  `hostile` int NOT NULL,
  `enthusiastic` int NOT NULL,
  `proud` int NOT NULL,
  `irritable` int NOT NULL,
  `alert` int NOT NULL,
  `ashamed` int NOT NULL,
  `inspired` int NOT NULL,
  `nervous` int NOT NULL,
  `determined` int NOT NULL,
  `attentive` int NOT NULL,
  `jittery` int NOT NULL,
  `active` int NOT NULL,
  `afraid` int NOT NULL,
  `date_completed` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `panas_user_id_idx` (`user_id`),
  CONSTRAINT `panas_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `probabilistic_reinforcement_learning`
--

DROP TABLE IF EXISTS `probabilistic_reinforcement_learning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `probabilistic_reinforcement_learning` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `question_number` int NOT NULL,
  `left_image_name` varchar(45) NOT NULL,
  `left_image_probability` double NOT NULL,
  `right_image_name` varchar(45) NOT NULL,
  `right_image_probability` double NOT NULL,
  `user_response` char(1) NOT NULL,
  `initial_timestamp` date NOT NULL,
  `response_timestamp` date NOT NULL,
  `correct_choice` tinyint NOT NULL,
  `date_completed` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `probabilistic_reinforcement_learning_user_id_idx` (`user_id`),
  CONSTRAINT `probabilistic_reinforcement_learning_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `slot_machine`
--

DROP TABLE IF EXISTS `slot_machine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `slot_machine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `number_of_games_played` int NOT NULL,
  `feedback_happy` double NOT NULL,
  `feedback_continue` double NOT NULL,
  `win` tinyint NOT NULL,
  `nearMiss` tinyint NOT NULL,
  `date_completed` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `slot_machine_user_id_idx` (`user_id`),
  CONSTRAINT `slot_machine_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-13 15:28:42
