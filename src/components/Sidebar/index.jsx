import React, {useCallback, useContext, useMemo, useState} from "react";
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser, selectUserRole } from "../../redux/auth/selectors";
import { signOutStart } from '../../redux/auth/actions';

import {useLinks} from "./links";

import './style.scss';


const Sidebar = ({ user, logout }) => {
  const { name, surname, role } = user;
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const links = useLinks(role);
  
  const fullName = useMemo(() => `${name} ${surname}`, [name, surname]);
  
  const sidebarClasses = useMemo(() => `sidebar ${collapsed ? 'collapsed' : ''}`, [collapsed]);
  
  const collapse = (e) => {
    if(e.target.tagName !== 'ASIDE') return;
    setCollapsed(!collapsed);
  };
  
  return (
    <aside onClick={collapse} className={sidebarClasses}>
      <div className="sidebar_top avatar">
        <img src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg" />
        <h2>{ fullName }</h2>
        <span className="role">{ role }</span>
        <button onClick={() => logout()}>
          <span>Logout</span>
          <i className="fas fa-sign-out-alt"/>
        </button>
      </div>
      
      { !collapsed && <div className="sidebar_nav">
        <ul>
          {links}
        </ul>
      </div> }
      
    </aside>
  )
};

const mapStateToProps = createStructuredSelector({
  user: selectUser
});

const mapDispatchToProps = dispatch => ({
  logout: item => dispatch(signOutStart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
