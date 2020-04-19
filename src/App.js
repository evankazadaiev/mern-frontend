import React, {useEffect, useState} from 'react';
import { Router } from "react-router-dom";
import history from './utils/history';
import EventBus from './utils/event-bus.utils';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { startChannel } from './redux/chat/actions';
import { AuthContext } from './context/AuthContext';

import Routes from "./routes";
import {useAuth} from "./hooks/auth.hook";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactsModal from "./components/ContactsModal";

import { createStructuredSelector } from 'reselect';
import { selectToken } from './redux/auth/selectors';

toast.configure({
  autoClose: 3000,
  draggable: false,
  position: toast.POSITION.BOTTOM_CENTER
});

Modal.setAppElement('#root');

function App({ token, connectSocket }) {
  const [modalActive, setModalActive] = useState(false);
  const { login, logout, id, decodedToken, ready, checked, getMe, getAndUpdate, setIsOnline, setChecked } = useAuth();
  const { role = null } = decodedToken;
  const isAuthenticated = !!token;
  
  useEffect(() => {
    EventBus.subscribe('showModal', () => {
      setModalActive(true);
      console.log('show');
    });
    EventBus.subscribe('hideModal', () => {
      setModalActive(false);
    });
    return () => {
      EventBus.unsubscribe('showModal');
      EventBus.unsubscribe('hideModal');
    }
  }, []);
  
  useEffect(() => {
    token && connectSocket();
  }, [token])


  if(!ready) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, id, decodedToken, isAuthenticated, checked, getMe, getAndUpdate, setIsOnline, setChecked  }}>
        <Router history={history}>
          <div className="container">
            <Routes />    
          </div>
        </Router>
        <ContactsModal
          isOpen={modalActive}
          onRequestClose={() => setModalActive(false)}
        />
    </AuthContext.Provider>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken
});

const mapDispatchToProps = dispatch => ({
  connectSocket: () => dispatch(startChannel())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
