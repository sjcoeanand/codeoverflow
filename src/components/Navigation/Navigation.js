import React from 'react';
import { NavLink, Redirect  } from 'react-router-dom';
import { Container } from 'reactstrap';

class Navigation extends React.Component {
    constructor(){
        super();
        this.state = {
            redirect : false,
        }
    }
    isAuthenticated() {
        const userdetails = localStorage.getItem('LoggedUser')
        
        return userdetails
    }
    logOutHandler = async event => {
        localStorage.clear('LoggedUser');
        console.log('cookies cleared');
        window.location.reload()
        this.setState({redirect: true})
    }

    render(){
        const {redirect} = this.state;
        if(redirect){
            return <Redirect push to="/"/> 
        }
        const userdetails = localStorage.getItem('LoggedUser');
        // const username = userdetails && JSON.parse(userdetails).uname || '';
        const username = userdetails && JSON.parse(userdetails).uname;
        console.log("userdetails1 ", username);
        const isAuthenticated = this.isAuthenticated();
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-custom justify-content-between">
                <Container>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink className="navbar-brand" to="/">CodeOverflow</NavLink>
                        {
                            isAuthenticated ? 
                                (<div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item user-name">
                                        <span>welcome  {username}</span> 
                                        </li>
                                        <li><button onClick={this.logOutHandler}>Logout</button></li>
                                    </ul>
                                </div>)
                            :
                                (<div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">Log-in</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/register">Register</NavLink>
                                        </li>
                                    </ul>
                                </div>)
                        }
                    </Container>
            </nav>
        );
    }
}

export default Navigation;