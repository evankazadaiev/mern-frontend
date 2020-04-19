/*
 * HTTP helper file is to manipulate easily with axios instances that will allow
 * to use separate and individual access to axios object, so for each instance will
 * be provided it's own interceptor ro error handler if needed.
 * File exports Axios instance, at least one for general preset (may create new one
 * if needed in future) and path object that will return exact path to API strings
 */

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { API_URL } from '../config/';
import history from '../utils/history';
import { errorNotify } from "../utils/toast.utils";

import reduxStore from '../redux/store'
import { setTokensStart, signOutStart } from '../redux/auth/actions';

export const getRefreshToken = () => {
  const { store } = reduxStore;
  const { auth } = store.getState();
  const { refreshToken } = auth;
  
  return refreshToken;
};

const getToken = () => {
  const { store } = reduxStore;
  const { auth } = store.getState();
  const { token } = auth;
  
  return token;
};

const setTokens = (data) => {
  const { store } = reduxStore;
  store.dispatch(setTokensStart(data));
};

// Creation of Axios independent instance
export const http = axios.create({
  baseURL: `${API_URL}`,
  timeout: 5000
});

export const http_refresh_token = () => {
  return axios.create({
    baseURL: `${API_URL}auth/token`,
    headers: {
      'x-refresh-token': getRefreshToken()
    },
    timeout: 5000
  });
};


export const refreshTokenAndHeaders = async () => {
  const { store } = reduxStore;
  try {
    const res = await http_refresh_token().post();
    setTokens(res.data.payload);
  } catch(error) {
    await store.dispatch(signOutStart());
  }
};


//retry request
const retryRequest = (request) => {
  const { config } = request.response;
  return new Promise((resolve, reject) => {
    http.request(config).then(response => {
      resolve(response);
    }).catch((error) => {
      localStorage.clear();
      errorNotify('Session expired. Please login again.');
      reject(error);
    })
  });
};

// Create here new instances if needed

const refreshAuthLogic = async failedRequest => {
  const { store } = reduxStore;
  try {
    const res = await http_refresh_token().post();
    setTokens(res.data.payload);
    // localStorage.setItem('token', res.data.payload.token);
    // localStorage.setItem('refreshToken', res.data.payload.refreshToken);
    failedRequest.response.config.headers['Authorization'] = `Bearer ${res.data.payload.token}`;
    return retryRequest(failedRequest);
  }
  catch (error) {
    await store.dispatch(signOutStart());
    errorNotify('Session expired. Please login again.');
    return Promise.reject(error);
  }
};

// Apply interceptors logic to each created axios independent instance if needed
http.interceptors.request.use(config => {
  if (getToken()) {
    getRefreshToken();
    config.headers.Authorization = `Bearer ${getToken()}`;
  }
  return config;
}, async error => {
    console.log('error here ,', error.response);
    return Promise.resolve(error);
});


createAuthRefreshInterceptor(http, refreshAuthLogic);

http.interceptors.response.use(
  config => {
      return config.data?.payload
  },
  async error => {
    return Promise.reject(error);
  }
);

