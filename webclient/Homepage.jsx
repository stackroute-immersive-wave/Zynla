import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory, Route, Router} from 'react-router';
import NavBar from './components/NavBar';
// import DisplayComponent from './components/sample/displayComponent.jsx';
import Home from './components/clientapp.jsx';
import Login from './components/sample/login.jsx';
import Signup from './components/sample/signup.jsx';
import SentMailPage from './components/sample/SentMailPage';
import SuccessfullyRegistered from './components/sample/successfullyregistered';
// let {browserHistory, Route, Router, IndexRoute} = require('react-router');
class MainComp extends React.Component {
  render() {
    return(
      <div>
      <NavBar/>
      <br/><br/><br/><br/>
        {this.props.children}
      </div>
    );
  }
}
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path = "/" component={Login}/>
    <Route component={MainComp}>
    <Route path="/home" component={Home}/>
    </Route>
    <Route path='/signup' component={Signup}/>
    <Route path='/mail' component={SentMailPage} />
    <Route path='/successfullyregistered' component={SuccessfullyRegistered}/>
  </Router>, document.getElementById('mountapp'));
MainComp.propTypes = {
    children: React.PropTypes.object.isRequired
  };
