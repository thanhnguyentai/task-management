import React from 'react';
import Layout from './Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

import userHelper from './helper/user';

import createStore from './createStore';
import {Provider} from 'react-redux';

function App() {
  const isLogin = userHelper.isLogin();

  return (
    <Provider store={createStore()}>
      <Layout>
        {!isLogin && <Login/>}
        {isLogin && <Tasks/>}
      </Layout>
    </Provider>
  );
}

export default App;
