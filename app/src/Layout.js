import React from 'react';
import './css/app.scss';
import {connect} from 'react-redux';
import {getUserData} from './reducers';
import {setUserInfoAction} from './actions/user';
import UserService from './service/userService';

function mapStateToProps(state, ownProps) {
  return {
    user: getUserData(state)
  }
}

function Layout({children, user, setUserInfo}) {
  const logout = function() {
    UserService.logout().then(()=> {
      setUserInfo({});
    }).catch(err => {});
  };

  return ( 
    <React.Fragment>
      <div className="app-wrapper container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="app-header">
              <h1>Task Management</h1>
              {
                user.id &&
                <span className="user-info">
                  Hi {user.name}, <span onClick={logout} className="clickable link">Logout</span>
                </span>
              }
            </div>
          </div>
          <div className="app-body col-12">
            {children}
          </div>
          <div className="app-footer col-12">
            &copy;2019
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, {
  setUserInfo: setUserInfoAction
})(Layout);