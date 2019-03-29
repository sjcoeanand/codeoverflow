# codeoverflow
Basic web app like stackoverflow or quora for user questions and answers
This project is my small foot print towards learning react in last two months to make a web application for users questions, answers, likes, dislikes.

# Framework / local server / Backend used : 
  React JS for front end
  Node, Express for Backend
  Mysql2 for database
  xampp server

    # Step 1 :
    create database and use following query to create tables and their structure
  --
    -- Database: `codeoverflow`
    -- --------------------------------------------------------
    -- Table structure for table `answerdata`
    --

      CREATE TABLE `answerdata` (
        `ansid` int(100) NOT NULL,
        `qid` int(255) NOT NULL,
        `anstitle` varchar(1000) NOT NULL,
        `ansdesc` varchar(1000) NOT NULL,
        `dateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `username` varchar(500) NOT NULL,
        `userlike` int(255) NOT NULL,
        `userdislike` int(255) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

      -- --------------------------------------------------------
    -- Table structure for table `qnadata`
    --

    CREATE TABLE `qnadata` (
      `qid` int(100) NOT NULL,
      `langname` varchar(100) NOT NULL,
      `questions` varchar(100) NOT NULL,
      `qstndescription` varchar(1000) NOT NULL,
      `answers` varchar(100) NOT NULL,
      `dateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `username` varchar(500) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;



    -- -- --------------------------------------------------------
    -- Table structure for table `users`
    --

    CREATE TABLE `users` (
      `uid` int(100) NOT NULL,
      `uname` varchar(100) NOT NULL,
      `uphone` int(100) NOT NULL,
      `uemail` varchar(100) NOT NULL,
      `upassword` varchar(100) NOT NULL,
      `ucpassword` varchar(100) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- -- --------------------------------------------------------
    -- Indexes for table `answerdata`
    --
    ALTER TABLE `answerdata`
      ADD PRIMARY KEY (`ansid`);

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
    -- AUTO_INCREMENT for table `answerdata`
    --
    ALTER TABLE `answerdata`
      MODIFY `ansid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

    --
    -- AUTO_INCREMENT for table `qnadata`
    --
    ALTER TABLE `qnadata`
      MODIFY `qid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
    -- AUTO_INCREMENT for table `users`
    --
    ALTER TABLE `users`
      MODIFY `uid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
    COMMIT;

    =======================================================================================
    Inside that directory, it will generate the initial project structure and install the transitive dependencies:


    codeoverflow (main directory)
  
    ├── server (sub directory for backend includes all database coonections + API)


    Just clone directory and follow below steps

    steps for app
    
      1.  'cd codeoverflow'
      2.  'npm install' (it will install all packages mentioned inside package.json)
      3.  'cd server'
      4.  'npm install' (it will install all packages mentioned inside package.json)
      5.   start xampp server
      6.   again go to 'cd codeoverflow'
      7.  'npm start' (in terminal 1)
      8.   now go to 'cd server'
      9.  'npm start' (in terminal 2)
      10.  now again go to 'cd server'
      11. 'npm run babel' (in terminal 3)
      
      Register new user
      login with user
      add question
      post answers to those questions with another user
      like dislike post and enjoyyyyyy
