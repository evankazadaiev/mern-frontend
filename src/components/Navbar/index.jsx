import React, {useContext, useEffect, useMemo} from "react";
import { useLocation} from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeOnlineStart } from '../../redux/auth/actions';
import { selectIsOnline } from '../../redux/auth/selectors';

import ToggleSwitch from '../UI/ToggleSwitch';

import './style.scss';

import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ changeOnline, isOnline }) => {
  const { checked, getAndUpdate } = useContext(AuthContext);
  
  const handleChange = (e) => {
    const { checked } = e.target;
    changeOnline({ isOnline: checked });
  };
  
  useEffect(() => {
    console.log('current isOnline', isOnline);
  }, [])

  const { pathname } = useLocation();
  
  const currentRoute = useMemo(() => {
    switch (pathname) {
      case '/admin/home':
        return 'Home page';
      case '/admin/create':
        return 'Create user page';
      default:
        if(pathname.startsWith('/admin/update/')) return 'Update user';
        else return '';
    }
  }, [pathname]);
  
  return (
    <header className="header">
      <div className="nav-wrapper">
        <span className="route">{ currentRoute }</span>
        <ToggleSwitch checked={isOnline} handleChange={handleChange} label="Is online?" id="is-online" name="is-online"/>
      </div>
    </header>
  )
};

const mapStateToProps = createStructuredSelector({
  isOnline: selectIsOnline
});

const mapDispatchToProps = dispatch => ({
  changeOnline: data => dispatch(changeOnlineStart(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
