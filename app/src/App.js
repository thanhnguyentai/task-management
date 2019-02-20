import React, { useState, useEffect} from 'react';
import Layout from './Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import UserService from './service/userService';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {setUserInfoAction} from './actions/user';
import {getUserData} from './reducers';

function mapStateToProps(state) {
  return {
    user: getUserData(state)
  }
}

function App({setUserInfo, user}) {
  const [isChecking, setIsChecking] = useState(true);
  useEffect(() => {
    UserService.checkSession().then(data => {
      setIsChecking(false);
      if(data.id) {
        setUserInfo(data);
      }
    }).catch(err => {
      setIsChecking(false);
    });
  }, []);

  const onLogin = function(data) {
    setUserInfo(data);
  }

  return (
    <Layout>
      {
        isChecking && 
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      }
      { !isChecking && (!user || !user.id) &&
        <Router>
          <Switch>
            <Route path="/" exact render={() => (<Login onLogin={onLogin}/>)}></Route>
            <Redirect to="/"/>
          </Switch>
        </Router>
      }
      { !isChecking && (user && user.id) && 
        <Router>
          <Switch>
            <Route path="/projects" exact component={Projects}/>
            <Route path="/projects/:projectId" component={Tasks}/>
            <Redirect to="/projects"/>
          </Switch>
        </Router>
      }
    </Layout>
  );
}

export default connect(mapStateToProps, {
  setUserInfo: setUserInfoAction
})(App);
