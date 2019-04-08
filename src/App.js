import React from 'react';
import './App.css';
import './global/global.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import HomePage from './components/Page/HomePage';
import PostQuestion from './components/Questions/PostQuestion';
import Login from './components/Users/Login/Login';
import Register from './components/Users/Register/Register';
import Answer from './components/Answer/Answer';
import Error from './components/Error/Error';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Navigation />
            <Container>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/welcome" component={HomePage} />
                <Route  path="/Login" component={Login} />
                <Route exact path="/Register" component={Register} />
                {/* <Route exact path="/post-question" component={PostQuestion}/> */}
                <Route path="/answer/:qid"  component={Answer} />
                {/* <Route path="/answer" component={Answer} /> */}
                <Route path='/post-question' component={PostQuestion} />
                {/* <Route path='/post-question' component={PostQuestion} /> */}
                <Route component={Error} />
              </Switch>
              </Container>
              <Footer/>
        </div>
    </ Router>
    );
  }
}

export default App;