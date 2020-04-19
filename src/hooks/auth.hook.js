import { useState, useCallback, useContext, useEffect } from 'react';
import authUtils from '../utils/auth.utils';
import {useDebounce} from "./debounce.hook";
import {useHttp} from "./http.hook";
import {successNotify} from "../utils/toast.utils";

import socket_utils from '../utils/socket.utils';


export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [decodedToken, setDecodedToken] = useState({});
  
  const [checked, setChecked] = useState(false);
  const debouncedChecked = useDebounce(checked, 1000);
  const { request, loading, error } = useHttp();
  
  const getMe = useCallback(async () => {
    const req = {
      url: 'auth/me'
    };
    const { isOnline = false } = await request(req) || {};
    return isOnline;
  }, [request]);
  
  const setIsOnline = async (data) => {
    const req = {
      url: 'auth/online',
      method: 'PUT',
      data
    };
    
    const res = await request(req);
    successNotify(`${data.isOnline ? 'Online' : 'Offline'} mode.`);
    return res;
  };
  
  const getAndUpdate = async (data) => {
    try {
      await setIsOnline(data);
      const isOnline = await getMe();
      setChecked(isOnline);
      return isOnline;
    } catch (error) {
    }
  };
  
  const setInitialIsOnline = async () => {
    const isOnline = await getMe();
    setChecked(isOnline);
  };
  
  const login = useCallback(async (jwtToken, refreshToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('id', id);
    
    const userObj = authUtils.parseToken(jwtToken);
    setDecodedToken(userObj)
  }, []);
  
  const logout = useCallback(async () => {
    await setIsOnline({ isOnline: false });
    setToken(null);
    setUserId(null);
    setDecodedToken({});
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('id');
  }, []);
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const id = localStorage.getItem('id');
    if(token && refreshToken &&  id) {
      login(token, refreshToken, id);
      // socket_utils.connect();
      setInitialIsOnline()
    } else {
      // socket_utils.disconnect();
    }
    setReady(true);
  }, [login]);
  
  return { login, logout, token, userId, decodedToken, ready, getMe, checked, setChecked, setIsOnline, getAndUpdate }
};
