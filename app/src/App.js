import React from 'react';
import Layout from './Layout';
import Login from './components/Login';
import Tasks from './components/Tasks';

import userHelper from './helper/user';

function App() {
  const isLogin = userHelper.isLogin();

  return (
    <Layout>
      {!isLogin && <Login/>}
      {isLogin && <Tasks/>}
    </Layout>
  );
}

export default App;
