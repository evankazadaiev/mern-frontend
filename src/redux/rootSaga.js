import { all, call } from 'redux-saga/effects';


import { authSagas } from './auth/sagas';
import { usersSagas } from './users/sagas';
import { chatNewSagas } from './chat/new_sagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(usersSagas),
    call(chatNewSagas),
  ])
}
