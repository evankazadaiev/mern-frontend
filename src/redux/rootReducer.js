import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/reducer';
import usersReducer from './users/reducer';
import progressReducer from './progress/reducer';
import chatReducer from './chat/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  progress: progressReducer,
  chat: chatReducer
});

export default persistReducer(persistConfig, rootReducer);
