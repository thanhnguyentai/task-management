import React from 'react';
import Layout from './Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

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
