import db from './dbcon'

async function getLangData () {
    var result1 = await db.sql("select * from langcat");
    console.log("All Languages = ", result1);
    return result1;
}

async function addLanguageData (langname) {
    console.log("Adding Languages = ");
    var result5 = await db.sql(`insert into langcat (langname) values ('${langname}')`);
    return result5;
}

async function addUserData (name, phone, email, password, cpassword){
    console.log("User added ", name  + "email " + email);
    var result = await db.sql(`insert into users (uname, uphone, uemail, upassword, ucpassword) values 
    ('${name}', '${phone}', '${email}', '${password}', '${cpassword}')`);
    return result;
}

async function addQuestionData(language, qtitle, qdescription, username){
    var result = await db.sql(`insert into qnadata (langname, questions, qstndescription, username) values ('${language}', '${qtitle}', '${qdescription}', '${username}')`);
    return result;
}

async function postAnswerData(anstitle, ansdesc, qid, username){
    var result = await db.sql(`insert into answerdata (anstitle, ansdesc, qid, username) values ('${anstitle}','${ansdesc}', '${qid}', '${username}')`);
    return result;
}

async function addLikeData(ansid,ulike){
    var result = await db.sql(`update answerdata set userlike='${ulike}' where ansid='${ansid}'`)
    return result;
}

async function addUnLikeData(ansid, udislike){
    var result = await db.sql(`update answerdata set userdislike='${udislike}' where ansid='${ansid}'`)
    return result;
}

async function showAnswerData(qid){
    var result1 = await db.sql(`select * from answerdata where qid='${qid}'`);
    return result1;
}

async function showQuestionData (){
    var result = await db.sql(`select * from qnadata ORDER BY dateTime DESC`);
    // console.log("All Questions ", result);
    return result;
}

async function showFetchedQuestionData (qid){
    var result = await db.sql(`select * from qnadata where qid= '${qid}'`);
    // console.log("All Questions ", result);
    return result;
}

async function logInUser(uemail, upassword){
    console.log("searchUserData = ** ", logInUser)
    var result = await db.sql(`select uname, uemail, uphone from users where uemail = '${uemail}' AND upassword = '${upassword}'`);
    return result;
}



module.exports = { getLangData , addLanguageData, addUserData, addQuestionData, postAnswerData, showQuestionData, showAnswerData, showFetchedQuestionData, logInUser, addLikeData, addUnLikeData}