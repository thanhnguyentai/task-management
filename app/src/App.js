import React, { useState, useEffect} from 'react';
import Layout from './Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import UserService from './service/userService';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  useEffect(() => {
    UserService.isLoggin().then(data => {
      if(data.isLoggin) {
        setLogin(true);
      } else {
        setLogin(false);
      }
      setIsChecking(false);
    });
  }, []);

  const onLogin = function() {
    setLogin(true);
  }

  return (
    <Layout>
      {
        isChecking && 
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      }
      { !isChecking && !isLogin &&
        <Router>
          <Switch>
            <Route path="/" exact render={() => (<Login onLogin={onLogin}/>)}></Route>
            <Redirect to="/"/>
          </Switch>
        </Router>
      }
      { !isChecking && isLogin && 
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

export default App;
