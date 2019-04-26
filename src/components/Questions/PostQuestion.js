import React from 'react';
import {Row, Col, Form} from 'reactstrap';
import './questions.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../.././Helpers';

const url = "http://157.230.5.205:5001";

class PostQuestion extends React.Component {
    constructor(){
        super();
        this.state = {
            fields : {
                language : "",
                qtitle : "",
                qdescription:"",
            },
            username : "",
            error : ""
        }
    }

    // isAuthenticated (){
    //     const userdetails = localStorage.getItem('LoggedUser');
    //     const username = userdetails && JSON.parse(userdetails).uname;
    //     console.log("username from post Questions", username);
    //     this.setState({uname : username});
    // }

    onChangeQstnHandler = (key, value) => {
        let onChangeQstnFields = this.state.fields;
        onChangeQstnFields[key] = value;
        this.setState({fields : onChangeQstnFields});
    }

    postQusetionValidation = () => {
        let postQstnfields = this.state.fields;
        let postQstnError = {};
        let isFormFilled = true;

        if(!postQstnfields["language"]){
            isFormFilled = false;
            postQstnError["language"] = "Please select atleast one value";
        }

        if(!postQstnfields["qtitle"]){
            isFormFilled = false;
            postQstnError["qtitle"] = "Please add title of your question";
        }

        this.setState({error : postQstnError});
        return isFormFilled;
    }

    submitQuestionHandler = (e) =>{
        e.preventDefault(e);
        if(!this.postQusetionValidation())
            return alert("Please check errors");
            
        const userdetails = localStorage.getItem('LoggedUser');
        const username = userdetails && JSON.parse(userdetails).uname;
        
        let resultFields = this.state.fields;
        // console.log("question add button clicked and data added", resultFields);

        //pass data to db
        const res = axios.post(`${url}/addquestion`, {...resultFields, username})
        .then(function(response){
            window.location = "/";
            return response.data;
        })
        .catch(function(error){
            console.log(error);
        })
        
        const {error} = res;
            if(error)
            return alert(error);

            resultFields = {
                language : "",
                qtitle : "",
                qdescription:""
            }
            this.setState({fields : resultFields})
            alert("Question added to db");
    }

    render(){
        const isAuth = isAuthenticated(),
            referer = this.props.location.pathname
            console.log('lnt', referer)
        return(
            <div className="post-question">
                <div className="post-question--heading">
                        <h2>Ask Question</h2>
                </div>
                {!isAuth ? 
                    <Redirect to={{pathname: '/login', state: {referer}}} />
                    :
                    <div className="post-question--wrapper">
                    <Row>
                        <Col md="6">
                            <Form onSubmit={this.submitQuestionHandler}>
                            <div className="post-question--inner">
                                <div className="post-question--select-category">
                                    <div className="select-category--heading">
                                        Please select any of the below Language
                                    </div>
                                    <select value={this.state.fields["language"]} onChange={(e)=>this.onChangeQstnHandler("language", e.target.value)}>
                                        <option>Please select Language</option>
                                        <option>Java</option>
                                        <option>React</option>
                                        <option>Python</option>
                                        <option>Php</option>
                                        <option>CSS</option>
                                        <option>JavaScript</option>
                                        <option>Others</option>
                                    </select>
                                    <span className="error">{this.state.error["language"]}</span>
                                </div>
                                <div className="post-question--question-title">
                                    <h4>Please enter question title</h4>
                                    <input type="text" value={this.state.fields["qtitle"]} placeholder="Please enter squestion title" onChange={(e)=> this.onChangeQstnHandler("qtitle", e.target.value)}/>
                                    <span className="error">{this.state.error["qtitle"]}</span>
                                </div>
                                <div className="post-question--question-description">
                                    <h5>Please enter question description</h5>
                                    <textarea placeholder="Please add brief description" value={this.state.fields["qdescription"]} onChange={(e) => this.onChangeQstnHandler("qdescription", e.target.value)}>      
                                    </textarea>
                                </div>
                                <div className="post-question--submit-btn">
                                    <button className="btn btn-primary">Post your question</button>
                                </div>
                            </div>
                            </Form>
                        </Col>
                        <Col md="6">
                            <div className="post-question--conditions">
                            <ul>
                                <li>How to Ask</li>
                                <li>Welcome to Code Overflow!</li>
                                <li>We’d love to help you, but the reality is that not every question gets answered.</li>
                                <li>Search, and research</li>
                                <li>Have you thoroughly searched for an answer before </li>
                                <li>Try our more advanced search!</li>
                                <li>Be on-topic</li>
                            </ul>
                        </div>
                        </Col>
                    </Row>
                </div>
                }
            </div>
        );
    }
}

export default PostQuestion;