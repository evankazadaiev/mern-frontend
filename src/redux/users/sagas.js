import { takeLatest, debounce, put, all, call } from 'redux-saga/effects';
import { http } from '../../http';
import types from "./types";
import { successNotify } from '../../utils/toast.utils';
import {
  getUsersSuccess,
  getUsersFailure,
  setUsersTotal,
  getUserByIdSuccess,
  getUserByIdFailure,
  updateUserSuccess,
  updateUserFailure,
  resetUserById
} from "./actions";



export function* getUsers(data) {
  const { payload } = data;
  console.log(payload);
  try {
    const req = {
      url: 'users',
      method: 'GET',
      params: payload,
    };

    const response = yield http(req);

    yield put(getUsersSuccess(response.data));
 
    yield put(setUsersTotal(response.total));
  } catch (error) {
    yield put(getUsersFailure(error));
  }
}

export function* getUserById(action) {
    const { payload: id } = action;

    try {
        const req = {
            url: `users/${id}`,
            method: 'GET',
        };
        
        const { email = '', name = '', surname = '' } = yield http(req);
        
        yield put(getUserByIdSuccess({ email, name, surname }));
        return { email, name, surname };
    } catch (error) {
        yield put(getUserByIdFailure(error));
    }
}


export function* updateUserById(action) {
    console.log(action);
    const { payload: { userId, values } } = action;
    console.log('update user by id >>>', userId, values)
    try {
        const req = {
            url: `users/update/${userId}`,
            method: 'PUT',
            data: values
        };
       
        const response = yield http(req);

        successNotify('User updated!');

        yield put(updateUserSuccess());
        yield put(resetUserById());

    } catch (error) {
        yield put(updateUserFailure(error));
    }
}


//STARTERS
export function* onGetUsersStart() {
  yield takeLatest(types.GET_USERS_START, getUsers)
}

export function* onGetUserById() {
    yield takeLatest(types.GET_USER_BY_ID_START, getUserById);
}

export function* onUpdateUserById() {
    yield takeLatest(types.UPDATE_USER_START, updateUserById);
}



export function* usersSagas() {
  yield all([
    call(onGetUsersStart),
    call(onGetUserById),
    call(onUpdateUserById),
  ])
}
