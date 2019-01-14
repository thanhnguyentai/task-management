import React from 'react';
import './css/app.scss';

function Layout({children}) {
    return ( 
      <div className="app-wrapper container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="app-header">
              <h1>Task Management</h1>
            </div>
          </div>
          <div className="app-body col-12">
            {children}
          </div>
          <div className="app-footer col-12">
            &copy; Thanh Nguyen 2019
          </div>
        </div>
      </div>
    );
}

export default Layout;