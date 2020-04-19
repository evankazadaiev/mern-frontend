import types from './types';

const INITIAL_STATE = {
  user: null,
  error: null,
  token: null,
  refreshToken: null,
  userId: null,
  isOnline: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER: 
      return {
        ...state,
        user: action.payload
      }
    case types.CHANGE_ONLINE_SUCCESS:
      return {
        ...state,
        isOnline: action.payload.isOnline
      }
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.id,
        isOnline: true,
        error: null
      };
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: null,
        token: null,
        refreshToken: null,
        userId: null,
        isOnline: false
      };
    case types.SIGN_IN_FAILURE:
    case types.SIGN_OUT_FAILURE:
    case types.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        error: null
      };
    case types.SET_TOKENS_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.token,
        userId: action.payload.id
      }
    default:
      return state;
  }
};

export default userReducer;
