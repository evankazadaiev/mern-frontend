import { takeLatest, debounce, put, all, call } from 'redux-saga/effects';
import { http } from '../../http';
import types from "./types";
import authUtils from '../../utils/auth.utils';
import history from '../../utils/history';
import reduxStore from '../store';
import {
  signInSuccess,
  setCurrentUser,
  signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, setTokensSuccess, setTokensError, changeOnlineSuccess, changeOnlineFailure
} from "./actions";


import { startChannel } from '../chat/actions';

export function* signIn(data) {
  const { payload } = data;
  try {
    const req = {
      url: 'auth/login',
      method: 'POST',
      data: payload,
    };

    const response = yield http.request(req);
    yield put(signInSuccess(response));
 
    const decodedToken = authUtils.parseToken(response.token);
    yield put(setCurrentUser(decodedToken));
    
    history.push('/');
  } catch (error) {
    put(signInFailure(error));
  }
}

export function* signUp(data) {
  const { payload } = data;
  try {
    const req = {
      url: 'auth/sign-up',
      method: 'POST',
      data: payload,
    };
    const response = yield http.request(req);
    yield put(signUpSuccess(response));
    // history.push('/');
  } catch (error) {
    put(signUpFailure(error));
  }
}

export function* signOut() {
  try {
    console.log('sign out!!');
    // yield auth.signOut();
    yield put(signOutSuccess());
    yield history.push('/login');
  } catch(error) {
    yield put(signOutFailure());
  }
}

export function* changeOnline(data) {
  try {
    const { payload } = data;
    const req = {
      url: 'auth/online',
      method: 'PUT',
      data: payload
    };

    const { isOnline } = yield http(req);
    yield put(changeOnlineSuccess({ isOnline }));
  } catch (error) {
    yield put(changeOnlineFailure());
  }
};

export function* setTokens(data) {
  const { payload } = data;
  const { token } = payload;
  try {
    yield put(setTokensSuccess(payload));
    yield put(startChannel(token));
  } catch (error) {
    console.log('set tokens error', error);
    put(setTokensError());
  }
}


//STARTERS
export function* onSignInStart() {
  yield takeLatest(types.SIGN_IN_START, signIn)
}

export function* onSignUpStart() {
  yield takeLatest(types.SIGN_UP_START, signUp)
}

export function* onSignOutStart() {
  yield takeLatest(types.SIGN_OUT_START, signOut);
}

export function* onChangeOnlineStart() {
  yield debounce(300, types.CHANGE_ONLINE_START, changeOnline);
}

export function* onSetTokensStart() {
  yield takeLatest(types.SET_TOKENS_START, setTokens);
}



export function* authSagas() {
  yield all([
    call(onSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
    call(onChangeOnlineStart),
    call(onSetTokensStart),
  ])
}
