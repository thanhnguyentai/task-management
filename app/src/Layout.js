import React, {useState} from 'react';
import './css/app.scss';
import {connect} from 'react-redux';
import {getUserData} from './reducers';
import {setUserInfoAction} from './actions/user';
import UserService from './service/userService';
import {withRouter} from 'react-router-dom';

function mapStateToProps(state, ownProps) {
  return {
    user: getUserData(state)
  }
}

function Layout({children, user, setUserInfo}) {
  const [isLogout, setIsLogout] = useState(false);

  const logout = function() {
    UserService.logout().then(()=> {
      setIsLogout(true);
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
                  Hi {user.name}, <a onClick={logout} className="clickable">Logout</a>
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