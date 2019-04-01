import React from 'react';
import {  Link } from 'react-router-dom';
import './questions.css';
import axios from 'axios';
import {humanized_time_span} from '../../Helpers';

const url = "https://anandshendage.com:2083";


class Questions extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount = async () => {
    const res = await axios.get(`${url}/showquestion`)
    .then(function(response){
      return response.data;
    })
    .catch(function(error){
        console.log(error);
    })
    const questions1 = res.result;
    this.setState({ questions : questions1})
    // console.log("Question list", questions1);
  }

  render() {
    const { questions } = this.state;
    const userdetails = localStorage.getItem('LoggedUser');
    const username = userdetails && JSON.parse(userdetails).uname;
    console.log("userdetails1 ", username);
    return (
      <div className="qstn-section">
        <div className="qstn-section--heading-wrapper">
          <div className="heading">
            <h1>Latest Questions</h1>
          </div>
          <div className="cta-question">
            <Link to="/post-question" className="btn btn-primary s-btn">Ask Question</Link>
          </div>
        </div>

        <div className="qstn--wrapper">
          <div className="qstn--list">
            {
              questions && questions.map((item, index) => <div className="qstn--detail" key={index}>
                <h3>
                  <Link to={`/answer/${item.qid}`}>{item.questions}</Link>
                  <div className="lang-name">{item.langname}</div>
                </h3>
                <pre className="questionanswer-detail--description">
                    <p>{item.qstndescription}</p>
                    <div className="user-info">
                      <span className="timeStamp">{humanized_time_span(new Date(item.dateTime))}</span>
                      <span className="posted-by">Posted By : <span>{item.username}</span></span>
                    </div>
                </pre>
              </div>)
            }       
          </div>
        </div>
      </div>
    );
  }
}

export default Questions;