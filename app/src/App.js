import React from 'react';
import Layout from './Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

import userHelper from './helper/user';

import createStore from './createStore';
import {Provider} from 'react-redux';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

function App() {
  const isLogin = userHelper.isLogin();

  return (
    <Provider store={createStore()}>
      <Layout>
        {!isLogin && <Login/>}
        { isLogin && 
          <DragDropContextProvider backend={HTML5Backend}>
            <Tasks/>
          </DragDropContextProvider>
        }
      </Layout>
    </Provider>
  );
}

export default App;
