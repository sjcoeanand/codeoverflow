import React from 'react';
import { Link } from 'react-router-dom';
import {  Form, FormGroup, Label, Input } from 'reactstrap';
import '../user.css';
// import ImageUploader from 'react-images-upload';
import axios from 'axios';

const url = "http://157.230.5.205:5001";


class Register extends React.Component {
    constructor(){
        super();
        this.state = {
            fields : {
                name : "",
                phone : "",
                email : "",
                password : "",
                cpassword : ""
            },
            // pictures: [],
            error : ""
        }
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    onChangeHandler = (key, value) => {
        const onChangeFields = this.state.fields;
        onChangeFields[key] = value;
        this.setState({fields : onChangeFields})
    }
    
    validationHandler = () => {
        let onChangeFields = this.state.fields;
        let fieldError = {};
        let formIsValid = true;

        // if(!onChangeFields["name"]  || !onChangeFields["name"].match(/^[a-zA-Z]+$/)){
        if(!onChangeFields["name"]){
            formIsValid = false;
            fieldError["name"] = "Please enter valid name";
        }
        if(!onChangeFields["phone"]){
            formIsValid = false;
            fieldError["phone"] = "Please enter phone number"
        }
        if(!onChangeFields["email"]){
            formIsValid = false;
            fieldError["email"] = "Please enter email"
        }
        if(!onChangeFields["password"] || !onChangeFields["cpassword"]){
            formIsValid = false;
            fieldError["password"] = "Please enter password" ;
            fieldError["cpassword"] = "Please enter password"
        }
        if(onChangeFields["password"].length > 0 && onChangeFields["password"].length < 4){
            formIsValid = false;
            fieldError["password"] = "Password should be of minimum 4 characters"
        }
        if(onChangeFields["cpassword"].length > 0 && onChangeFields["cpassword"].length < 4){
            formIsValid = false;
            fieldError["cpassword"] = "Password should be of minimum 4 characters"
        }
        if(onChangeFields["cpassword"] !== onChangeFields["password"]){
            formIsValid = false;
            fieldError["cpassword"] = "password and confirm password should be same"
        }

            this.setState({ error : fieldError });
            return formIsValid ;
    }

    registerUserHandler = (e) => {
        e.preventDefault(e);
        
        if(!this.validationHandler())
            return alert("Form has errors.");

        // const result = this.state.fields;
        let resetenteredFields = this.state.fields;

        // pass data to db
        const res = axios.post(`${url}/registerUser`, {...resetenteredFields})
        .then(function(response){
            return response.data;
        })
        .catch(function(error){
            console.log(error);
        })

        const {error} = res;
            if(error)
            return alert(error);

        resetenteredFields = {
                name : "",
                phone : "",
                email : "",    
                password : "",
                cpassword : ""
            }
        this.setState({fields : resetenteredFields})
        alert("User Added to database");
        // console.log("user added ", result);
        // return result;
    }

    render(){
        return(
            <div className="register">
                <div className="register--heading">Register to post your questions</div>
                <Form className="register--wrapper" onSubmit={this.registerUserHandler}>
                    <FormGroup>
                        <Label for="username">Name</Label>
                        <Input type="text" value={this.state.fields["name"]} onChange= {(e) => this.onChangeHandler('name', e.target.value)} placeholder="Please enter username" />
                        <span>{this.state.error["name"]}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userphone">Phone</Label>
                        <Input type="tel"  value={this.state.fields["phone"]} onChange= {(e) => this.onChangeHandler('phone', e.target.value)} placeholder="Please enter phone" />
                        <span>{this.state.error["phone"]}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="useremail">Email</Label>
                        <Input value={this.state.fields["email"]} onChange={ (e) => this.onChangeHandler('email', e.target.value)} type="email" placeholder="Please enter Email" />
                        <span>{this.state.error["email"]}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userpassword">Password</Label>
                        <Input type="password" value={this.state.fields["password"]} onChange={(e) => this.onChangeHandler('password', e.target.value)} placeholder="Please enter userpassword" />
                        <span>{this.state.error["password"]}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cuserpassword">confirm Password</Label>
                        <Input type="password" value={this.state.fields["cpassword"]} onChange={(e) => this.onChangeHandler('cpassword', e.target.value)} placeholder="Please enter userpassword" />
                        <span>{this.state.error["cpassword"]}</span>
                    </FormGroup>
                    {/* <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    /> */}
                    <FormGroup>
                        <button className="btn btn-primary">Register</button>
                    </FormGroup>
                </Form>
                <div className="vice-versa">
                    <Link to="/login">Already Registered?</Link>
                </div>
            </div>
        );
    }
}

export default Register;