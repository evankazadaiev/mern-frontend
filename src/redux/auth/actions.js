import types from './types';

export const signInStart = (data) => ({
  type: types.SIGN_IN_START,
  payload: data
});

export const signInSuccess = (user) => ({
  type: types.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: types.SIGN_IN_FAILURE,
  payload: error
});

export const setCurrentUser = data => ({
  type: types.SET_CURRENT_USER,
  payload: data
});

export const signOutStart = () => ({
  type: types.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: types.SIGN_OUT_SUCCESS
});

export const signOutFailure = () => ({
  type: types.SIGN_OUT_FAILURE
});

export const signUpStart = (signUpData) => ({
  type: types.SIGN_UP_START,
  payload: signUpData
});

export const signUpSuccess = (data) => ({
  type: types.SIGN_UP_SUCCESS,
  payload: data
});

export const signUpFailure = () => ({
  type: types.SIGN_UP_FAILURE
});


export const changeOnlineStart = (data) => ({
  type: types.CHANGE_ONLINE_START,
  payload: data
});

export const changeOnlineSuccess = (data) => ({
  type: types.CHANGE_ONLINE_SUCCESS,
  payload: data
});

export const changeOnlineFailure = () => ({
  type: types.CHANGE_ONLINE_FAILURE
});

export const setTokensStart = (data) => ({
  type: types.SET_TOKENS_START,
  payload: data
});

export const setTokensSuccess = (data) => ({
  type: types.SET_TOKENS_SUCCESS,
  payload: data
});

export const setTokensError = () => ({
  type: types.SET_TOKENS_ERROR,
});