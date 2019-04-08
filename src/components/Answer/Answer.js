import React from 'react';
import axios from 'axios';
import { isAuthenticated, humanized_time_span } from '../.././Helpers';
import { Redirect } from 'react-router-dom';
import './answer.css';
import PostAnswer from './PostAnswer';

const url = "http://localhost:5001";

class Answer extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            question: {},
            answers: [{
                ansid : "",
                anstitle : "",
                ansdesc : "",
                dateTime : "",
                userlike: 0,
                userdislike : 0,
            
            }],
            username: "",
            currentAnswers: {
                anstitle: "",
                ansdesc: ""
            }
        }
    }

    onChangeAnswerHandler = (key, value) =>{
        const onChangeState = this.state.currentAnswers;
        onChangeState[key] = value;
        this.setState({currentAnswers : onChangeState})

    }

    showanswerAxiosGetHandler =() =>{
        const that = this,
        { qid } = this.props.match.params;
        axios.get(`${url}/showanswers?qid=${qid}`)
        .then(function(result){
            console.log("result.data.result", result.data.result)
            that.setState({ answers : result.data.result, currentAnswers: {anstitle: '', ansdesc: ''}})
        })
    }

    likeHandler = (event) => {
        const ansid = event.target.id,
            ulike = 1 + Number(event.target.dataset.likes);

        axios.post(`${url}/addlike`, {ulike, ansid})
            .then((result) => {
                result && 
                this.showanswerAxiosGetHandler()
            })
    }

    unLikeHandler = (event) => {
        const ansid = event.target.id,
            udislike = Number(event.target.dataset.unlike) - 1;
            
            axios.post(`${url}/addunlike`, {udislike, ansid})
                .then((result) =>{
                    result &&
                    this.showanswerAxiosGetHandler()
                })
    }

    submitAnswerHandler = (e) =>{
        e.preventDefault(e);
        const { currentAnswers: {anstitle, ansdesc} } = this.state,
            { qid } = this.props.match.params,
            userdetails = localStorage.getItem('LoggedUser'),
            username = userdetails && JSON.parse(userdetails).uname,
            that = this

        axios.post(`${url}/postAnswer`, {anstitle, ansdesc, qid, username})
            .then(function(response){

            response && 
                    that.showanswerAxiosGetHandler({currentAnswers: {anstitle: '', ansdesc: ''}})
        })
    }

    componentDidMount = (e) => {
        const { qid } = this.props.match.params;
        if(!qid) return null;
        // fetch questions
        axios
            .get(`${url}/fetchQuestion?qid=${qid}`)
            .then((result)=>{
                result && result.data
                    && this.setState({ question: result.data })
            })

        // for get answer list (+)
        axios
            .get(`${url}/showanswers?qid=${qid}`)
            .then((result)=>{
                result && result.data
                    && this.setState({ answers: result.data.result })
            })

    }
    redirectToLogin=()=>{
        this.setState({redirectToLogin: true})
    }

    render(){
        
        // console.log('============>>>>>>>>>>>', this.state.answers)
        const isAuth = isAuthenticated();
        const { question, answers, currentAnswers: { anstitle, ansdesc}} = this.state;
        const referer = this.props.location.pathname;
        return(
            this.state.redirectToLogin ? <Redirect to={{pathname : '/login', state: {referer}}} /> :
            <div className="questionanswer-detail">
                <div className="questionanswer-detail--wrapper">
                    <div className="questionanswer-detail--question-wrapper">
                        <div className="questionanswer-detail--heading">                         
                            <h1>{question.questions}<span className="lang-name">{question.langname}</span></h1>
                        </div>
                        <div className="questionanswer-detail--description">
                            <p>{question.qstndescription}</p>
                        </div>
                        <div className="user-info">
                            <span className="timeStamp">Asked : {humanized_time_span(new Date(question.dateTime))}</span>
                            <span className="posted-by">Posted By : <span>{question.username}</span></span>
                            </div>
                    </div>
                    <div className="questionanswer-detail--answer">
                        <div className="posted-answer--heading">Answers</div>
                        { 
                            this.state.map((item, index) => (
                                <div className="posted-answer" key={index} >
                                    <pre className="anstitle">
                                        {item.anstitle}
                                    </pre>
                                    <pre className="ansdesc">
                                        {item.ansdesc}
                                    </pre>
                                    <div className="user-info">
                                    <span className="timeStamp">answered : {humanized_time_span(new Date(item.dateTime))}</span>
                                    <span className="posted-by">Answered By : <span>{item.username}</span></span>
                                    </div>
                                    <div className="rating"> 
                                        <span className="like">
                                            <div>{item.userlike}</div>
                                            <div id={item.ansid} className="thumb" data-likes={item.userlike} onClick={this.likeHandler}>
                                            </div>
                                        </span>
                                        <span className="dislike">
                                            <div>{item.userdislike}</div>
                                            <div id={item.ansid} className="thumb" data-unlike={item.userdislike} onClick={this.unLikeHandler}>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                        {!isAuth ? 
                            <div className="submit">
                                <button onClick={this.redirectToLogin} className="btn btn-primary">Login to Post Your Answer</button>
                            </div>
                        :   (<PostAnswer
                                title={anstitle}
                                description={ansdesc}
                                onChangeAnswerHandler={this.onChangeAnswerHandler}
                                submitAnswerHandler={this.submitAnswerHandler}/>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Answer;