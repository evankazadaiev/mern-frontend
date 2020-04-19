import React from 'react';
import { Link } from "react-router-dom";

export const useLinks = (role) => {
  switch (role) {
    case 'SUPER_ADMIN':
      return (
        <>
          <li className="icon-dashboard">  <Link to="/admin/home"><i className="fa fa-home"/><span>Home</span></Link></li>
          <li className="icon-dashboard"><Link to="/admin/users"><i className="fa fa-users"/><span>Users</span></Link></li>
          <li className="icon-dashboard"><Link to="/admin/create"><i className="fa fa-user"/><span>Create User</span></Link></li>
        </>
      );
    case 'USER':
      return (
        <>
          <li className="icon-dashboard">  <Link to="/user/home"><i className="fa fa-home"/><span>Home</span></Link></li>
          <li className="icon-dashboard"><Link to="/user/profile"><i className="fa fa-user"/><span>Profile</span></Link></li>
          <li className="icon-dashboard"><Link to="/user/chat"><i className="fa fa-user"/><span>Chat</span></Link></li>
        </>
      );
    default:
      return (<></>)
  }
};
