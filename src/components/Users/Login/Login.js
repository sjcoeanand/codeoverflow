import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { isAuthenticated } from '../.././../Helpers';
import '../user.css';
import axios from 'axios';

const url = "http://157.230.5.205:5001";


class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            loginField : {
                uemail : "",
                upassword : ""
            },
            isAuthenticated : false,
            error: "",
            redirect: false,
        }
    }

    changeLoginFieldHandler = (key, value) =>{
        let changedloginField = this.state.loginField;
        changedloginField[key] = value;
        this.setState({loginField : changedloginField})
    }
    
    loginValidationHandler = () => {
        let {loginField} = this.state;
        let LoginErrors = {};
        let isInputFilled = true;

        if(!loginField["uemail"]){
            isInputFilled = false ;
            LoginErrors["uemail"] = " Please enter email id" ;
        }

        if(!loginField["upassword"]){
            isInputFilled = false ;
            LoginErrors["upassword"] = " Please enter user password" ;
        }

        this.setState({error : LoginErrors});
        return isInputFilled;
    }

    onLoginSubmit = async (e) => {
        e.preventDefault(e)
        if(!this.loginValidationHandler())
            return console.log("Please check errors")
        
        let { loginField } = this.state;
        const that = this;
        // pass login
        
        await axios.post(`${url}/fetchLoggedInUser`, {...loginField})
        .then(function(response){
            // console.log(response.data[0])
            if(response && response.data && response.data[0]) {
                localStorage.setItem('LoggedUser', JSON.stringify(response.data[0]));
                alert("user login successfull");
                loginField = {
                    uemail : "",
                    upassword : ""
                }
                that.setState({loginField})
            }else {
                alert("Please enter valid email password")
            }
        })
    }


    render(){
        // console.log('----------->asas', this.props.location.state.referer)
        //const {location: {state: {referer = null}}} = this.props,
        const referer = (this.props.location.state && this.props.location.state.referer)
            ? this.props.location.state.referer
            : null;
        console.log("referer>>>>>>>>>>>>>", referer)
        const isAuth = isAuthenticated();
        return(
            <div className="login">
                <div className="login--heading">User Login</div>         
                {/* { isAuth ? <Redirect to = {{pathname : '/post-question'}} />  : ( */}
                { isAuth ? <Redirect to = {{pathname : referer ? referer : '/'}} />  : (
                    <Form className="login--wrapper" onSubmit={this.onLoginSubmit}>
                    <FormGroup>
                        <Label for="useremail">Email</Label>
                        <Input type="email" value={this.state.loginField["uemail"]} onChange={(e) => this.changeLoginFieldHandler('uemail', e.target.value)} id="userloginemail" placeholder="Please enter Email" />
                        <span className="error">{this.state.error["uemail"]}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userpassword">Password</Label>
                        <Input type="password"  value={this.state.loginField["upassword"]} onChange={(e) => this.changeLoginFieldHandler('upassword', e.target.value)} id="userloginpassword" placeholder="Please enter userpassword" />
                        <span className="error">{this.state.error["upassword"]}</span>
                    </FormGroup>
                    <FormGroup>
                        <button className="btn btn-primary" >Login</button>
                    </FormGroup>
                </Form>
                )}        
                <div className="vice-versa">
                    <Link to="/register">New User?</Link>
                </div>        
            </div>
        );
    }
}

export default withRouter (Login);
