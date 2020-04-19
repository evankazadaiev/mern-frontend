import types from './types';

export const getUsersStart = (data) => ({
  type: types.GET_USERS_START,
  payload: data
});

export const getUsersSuccess = (data) => ({
    type: types.GET_USERS_SUCCESS,
    payload: data
});
  
export const getUsersFailure = (error) => ({
    type: types.GET_USERS_FAILURE,
    payload: error
});

export const setUsersTotal = (total) => ({
    type: types.SET_USERS_TOTAL,
    payload: total
});

export const getUserByIdStart = (id) => ({
    type: types.GET_USER_BY_ID_START,
    payload: id
})

export const getUserByIdSuccess = (user) => ({
    type: types.GET_USER_BY_ID_SUCCESS,
    payload: user
})

export const getUserByIdFailure = (error) => ({
    type: types.GET_USER_BY_ID_FAILURE,
    payload: error
})

export const updateUserStart = (userId, values) => ({
    type: types.UPDATE_USER_START,
    payload: { userId, values }
})

export const updateUserSuccess = () => ({
    type: types.UPDATE_USER_SUCCESS
})

export const updateUserFailure = (error) => ({
    type: types.UPDATE_USER_FAILURE,
    payload: error
})

export const resetUserById = () => ({
    type: types.RESET_USER_BY_ID
})