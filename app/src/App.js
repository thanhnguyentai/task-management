import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';

import UserService from './service/userService';

import createStore from './createStore';
import {Provider} from 'react-redux';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

function App() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    UserService.isLoggin().then(data => {
      if(data.isLoggin) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);

  const onLogin = function() {
    setLogin(true);
  }

  return (
    <Provider store={createStore()}>
      <Layout>
        { !isLogin &&
          <Router>
            <Switch>
              <Route path="/" exact render={() => (<Login onLogin={onLogin}/>)}></Route>
              <Redirect to="/"/>
            </Switch>
          </Router>
        }
        { isLogin && 
          <DragDropContextProvider backend={HTML5Backend}>
            <Router>
              <Switch>
                <Route path="/projects" exact component={Projects}/>
                <Route path="/projects/:projectId"  component={Tasks}/>
                <Redirect to="/projects"/>
              </Switch>
            </Router>
          </DragDropContextProvider>
        }
      </Layout>
    </Provider>
  );
}

export default App;
