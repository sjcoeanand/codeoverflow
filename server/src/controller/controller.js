import MD5 from 'md5';
import qaSql from '../sql/controller-query';
import {isEmpty} from 'lodash';

export const showAllLanguage = async (req, res) => {
    const getLang = await qaSql.getLangData();
    res.json({result : getLang})
}

export const addLanguage = async (req, res) => {
    const {langname} = req.body;
    console.log("New Language added in database is = ", langname);
    const addLang = await qaSql.addLanguageData(langname);
    res.json({result : addLang})
}

export const registerUser = async (req, res) => {
    const {name, phone, email, password, cpassword, pictures} = req.body;
    //server validation
    if(!name || !phone || !email || !password || !cpassword)
    return res.json({error : "please fill all the fields"})

    //encrypt pswd
    const encryptedPswd = MD5(password);
    const encryptedCnfmPswd = MD5(cpassword);
    const addUser = await qaSql.addUserData(name, phone, email, encryptedPswd, encryptedCnfmPswd, pictures);
    res.json({result : addUser})
}

export const addQuestion = async (req, res) => {
    const {language, qtitle, qdescription, username} = req.body;
    if(!language || !qtitle )
        return res.json({error : "please fill all the fields"})

    const addQ = await qaSql.addQuestionData(language, qtitle, qdescription, username);
    res.json({result : addQ})
}

export const postAnswer = async (req, res) => {
    const {anstitle, ansdesc, qid, username} = req.body;
    // if(!anstitle || !ansdesc)
    // return res.json({error : "please fill all the fields"})
    
    const postAns = await qaSql.postAnswerData(anstitle, ansdesc, qid, username);
    console.log("*******************",req.body)
    res.json({result : postAns})  
}

export const addLike = async (req, res) => {
    const {ansid ,ulike} = req.body;
    const userLike = await qaSql.addLikeData(ansid,ulike);
    res.json({result : userLike})
}

export const addUnLike = async (req, res) => {
    const {ansid, udislike} = req.body;
    const userDisLike = await qaSql.addUnLikeData(ansid, udislike);
    res.json({result : userDisLike})
}

export const showAllQuestion = async (req, res) => {
    const getQuest = await qaSql.showQuestionData();
    res.json({result : getQuest})
}

export const showAllAnswer = async (req, res) => {
    const {qid} = req.query;
    console.log("*******************",req.query)
    const getAnsw = await qaSql.showAnswerData(qid);
    res.json({result : getAnsw})
}

export const showAllQuestionDetailPage = async (req, res) => {
    const {qid} = req.query;
    const fetchQuest = await qaSql.showFetchedQuestionData(qid);
    res.json(fetchQuest[0])
}

export const userAuth = async (req, res) => {
    const {uemail, upassword} = req.body;
    if(!uemail || !upassword )
        return res.json({error : "please fill all the fields"})

    const hashPassword =  MD5(upassword);
    const searchUser = await qaSql.logInUser(uemail, hashPassword);
    if(isEmpty(searchUser))
        res.json({error : "email or password is not valid"}) 
    res.json(searchUser)
}