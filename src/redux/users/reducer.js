import types from './types';

const INITIAL_STATE = {
  users: null,
  total: null,
  error: null,
  userById: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_USERS_SUCCESS: 
      return {
        ...state,
        error: null,
        users: action.payload
      }
    case types.GET_USERS_FAILURE:
    case types.GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case types.SET_USERS_TOTAL:
        return {
            ...state,
            error: null,
            total: action.payload
        }
    case types.GET_USER_BY_ID_SUCCESS:
        return {
            ...state,
            error: null,
            userById: action.payload
        }
    case types.RESET_USER_BY_ID:
        return {
            ...state, 
            error: null,
            userById: null
        }
    default:
      return state;
  }
};

export default userReducer;
