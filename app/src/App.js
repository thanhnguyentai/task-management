import React from 'react';
import Layout from './Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';

import userHelper from './helper/user';

import createStore from './createStore';
import {Provider} from 'react-redux';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

function App() {
  const isLogin = userHelper.isLogin();

  return (
    <Provider store={createStore()}>
      <Layout>
        {!isLogin && <Login/>}
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
