import React, { Suspense } from 'react';
import Navbar from "./components/Navbar/";
import Loader from "./components/Loader/";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserRole, selectIsAuthenticated } from './redux/auth/selectors';


//AUTH ROUTES
import NoAuthRoutes from "./router/no-auth";

//ADMIN ROUTES
import AdminRoutes from "./router/admin";

//USER ROUTES
import UserRoutes from "./router/user";
import Sidebar from "./components/Sidebar";

const Routes = ({ isAuthenticated, role }) => {
  if(isAuthenticated) {
    if(role === 'SUPER_ADMIN') {
      return (
        <div className="route-sidebar-wrapper">
          <Sidebar/>
          <div className="header-page-wr">
            <Navbar/>
            <AdminRoutes isAuthenticated={isAuthenticated}/>
          </div>
        </div>
        );
    }
    return (
      <div className="route-sidebar-wrapper">
        <Sidebar/>
        <div className="header-page-wr">
          <Navbar/>
          <UserRoutes isAuthenticated={isAuthenticated}/>
        </div>
      </div>
    );
  }
  return (
    <NoAuthRoutes/>
  )
};

const mapStateToProps = createStructuredSelector({
  role: selectUserRole,
  isAuthenticated: selectIsAuthenticated
});

export default connect(mapStateToProps)(Routes);