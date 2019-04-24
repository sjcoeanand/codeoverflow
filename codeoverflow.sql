-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2019 at 07:25 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codeoverflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `answerdata`
--

CREATE TABLE `answerdata` (
  `ansid` int(100) NOT NULL,
  `qid` int(255) NOT NULL,
  `anstitle` varchar(1000) NOT NULL,
  `ansdesc` varchar(10000) NOT NULL,
  `dateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(500) NOT NULL,
  `userlike` int(255) NOT NULL,
  `userdislike` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answerdata`
--

INSERT INTO `answerdata` (`ansid`, `qid`, `anstitle`, `ansdesc`, `dateTime`, `username`, `userlike`, `userdislike`) VALUES
(1, 3, 'Answer', 'During the Anaconda install there should be an entry added the .bashrc file like this\n', '2019-03-25 05:51:01', 'me', 16, -9),
(22, 4, 'It is easier if you use pandas library.', 'First find all unique_words in your column. Then itertate over list of words and if count > 1 replace that word.', '2019-03-29 06:45:16', 'sam jose', 2, -1),
(28, 3, 'wada', 'awdwadwa', '2019-03-29 07:50:30', 'manav verma', 19, -9),
(29, 4, 'sa', 'as', '2019-03-29 10:27:03', 'manav verma', 2, -1),
(30, 4, '3434343', '34343434', '2019-03-29 11:20:43', 'manav verma', 6, -1),
(31, 5, 'google', 'google it', '2019-04-01 14:05:48', 'manav verma', 1, -1),
(32, 6, 'qwqw', 'qwqwqw', '2019-04-02 04:59:41', 'manav verma', 1, -1);

-- --------------------------------------------------------

--
-- Table structure for table `langcat`
--

CREATE TABLE `langcat` (
  `langid` int(100) NOT NULL,
  `langname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `langcat`
--

INSERT INTO `langcat` (`langid`, `langname`) VALUES
(15, 'java1'),
(16, 'python'),
(17, 'css'),
(19, 'jQuery'),
(21, 'PHP');

-- --------------------------------------------------------

--
-- Table structure for table `qnadata`
--

CREATE TABLE `qnadata` (
  `qid` int(100) NOT NULL,
  `langname` varchar(100) NOT NULL,
  `questions` varchar(1000) NOT NULL,
  `qstndescription` varchar(1000) NOT NULL,
  `dateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `username` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qnadata`
--

INSERT INTO `qnadata` (`qid`, `langname`, `questions`, `qstndescription`, `dateTime`, `username`) VALUES
(3, 'Python', 'use a bash file to activate anaconda environment automatically in linux', 'I tried to use the code \"test.sh below to automatically activate an anaconda python environment. I used the command: source tesh.sh However, the environment cannot be activated.', '2019-03-25 05:41:31.001755', 'john nelson'),
(4, 'Python', 'How to remove repeated words from an excel', 'I need to remove common words that are there in each line of an excel using python. ', '2019-03-29 06:43:58.179157', 'manav verma');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(100) NOT NULL,
  `uname` varchar(100) NOT NULL,
  `uphone` int(100) NOT NULL,
  `uemail` varchar(100) NOT NULL,
  `upassword` varchar(100) NOT NULL,
  `ucpassword` varchar(100) NOT NULL,
  `pictures` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `uname`, `uphone`, `uemail`, `upassword`, `ucpassword`, `pictures`) VALUES
(18, 'manav verma', 45545544, 'manav@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', '81dc9bdb52d04dc20036dbd8313ed055', 'undefined'),
(19, 'sam jose', 555445, 'sam@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', '81dc9bdb52d04dc20036dbd8313ed055', 'undefined');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answerdata`
--
ALTER TABLE `answerdata`
  ADD PRIMARY KEY (`ansid`);

--
-- Indexes for table `langcat`
--
ALTER TABLE `langcat`
  ADD PRIMARY KEY (`langid`);

--
-- Indexes for table `qnadata`
--
ALTER TABLE `qnadata`
  ADD PRIMARY KEY (`qid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answerdata`
--
ALTER TABLE `answerdata`
  MODIFY `ansid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `langcat`
--
ALTER TABLE `langcat`
  MODIFY `langid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `qnadata`
--
ALTER TABLE `qnadata`
  MODIFY `qid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
