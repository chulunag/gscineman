-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.21 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for gsdb
DROP DATABASE IF EXISTS `gsdb`;
CREATE DATABASE IF NOT EXISTS `gsdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `gsdb`;


-- Dumping structure for table gsdb.countries
DROP TABLE IF EXISTS `countries`;
CREATE TABLE IF NOT EXISTS `countries` (
  `code` int(11) NOT NULL,
  `name` varchar(127) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table gsdb.countries: ~2 rows (approximately)
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` (`code`, `name`) VALUES
	(1, 'United States'),
	(84, 'Vietnam');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;


-- Dumping structure for table gsdb.distributors
DROP TABLE IF EXISTS `distributors`;
CREATE TABLE IF NOT EXISTS `distributors` (
  `Column 1` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table gsdb.distributors: ~0 rows (approximately)
/*!40000 ALTER TABLE `distributors` DISABLE KEYS */;
/*!40000 ALTER TABLE `distributors` ENABLE KEYS */;


-- Dumping structure for table gsdb.genres
DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(127) NOT NULL,
  `Translate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table gsdb.genres: ~4 rows (approximately)
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` (`id`, `name`, `Translate`) VALUES
	(1, 'Action', '[{84:"Hành Động"}]'),
	(2, 'Comedy', 'asd'),
	(3, 'Adventure', 'sads'),
	(4, 'Drama', 'asd');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;


-- Dumping structure for table gsdb.movies
DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `IntTitle` varchar(127) NOT NULL,
  `Title` varchar(127) DEFAULT NULL,
  `Actors` varchar(255) DEFAULT NULL,
  `Genre` varchar(255) DEFAULT NULL,
  `Storyline` text,
  `Country` varchar(32) DEFAULT NULL,
  `Language` varchar(127) DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `Runtime` time NOT NULL,
  `Studio` varchar(127) DEFAULT NULL,
  `Distributor` varchar(127) DEFAULT NULL,
  `Director` varchar(127) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table gsdb.movies: ~2 rows (approximately)
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` (`id`, `IntTitle`, `Title`, `Actors`, `Genre`, `Storyline`, `Country`, `Language`, `ReleaseDate`, `Runtime`, `Studio`, `Distributor`, `Director`) VALUES
	(1, 'Mad Max : Fury Road', 'Max Điên : Con Đường Tử Thần', NULL, NULL, NULL, NULL, NULL, NULL, '01:30:00', NULL, NULL, NULL),
	(2, 'Tomorrow Land', 'Thế Giới Bí Ẩn', NULL, NULL, NULL, NULL, NULL, NULL, '01:15:00', NULL, NULL, NULL);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;


-- Dumping structure for table gsdb.studios
DROP TABLE IF EXISTS `studios`;
CREATE TABLE IF NOT EXISTS `studios` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(127) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- Dumping data for table gsdb.studios: ~21 rows (approximately)
/*!40000 ALTER TABLE `studios` DISABLE KEYS */;
INSERT INTO `studios` (`id`, `name`) VALUES
	(1, '20th Century Fox'),
	(2, 'Entertainment One'),
	(3, 'Focus Features'),
	(4, 'Fox Searchlight Pictures'),
	(5, 'IFC Films'),
	(6, 'Independent'),
	(7, 'Lionsgate'),
	(8, 'Lucasfilm'),
	(9, 'MGM Studios'),
	(10, 'Magnolia Pictures'),
	(11, 'Marvel Studios'),
	(12, 'Oscilloscope Laboratories'),
	(13, 'Paramount Pictures'),
	(14, 'Relativity Media'),
	(15, 'Samuel Goldwyn Films'),
	(16, 'Sony Pictures'),
	(17, 'Sony Pictures Classics'),
	(18, 'Summit Entertainment'),
	(19, 'Universal Pictures'),
	(20, 'Walt Disney Pictures'),
	(21, 'Warner Bros. Pictures'),
	(22, 'Weinstein Company');
/*!40000 ALTER TABLE `studios` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
