import types from './types';


export const getRoomMessagesStart = (roomId) => ({
    type: types.GET_ROOM_MESSAGES_START,
    payload: roomId
});

export const getRoomMessagesSuccess = (data) => ({
    type: types.GET_ROOM_MESSAGES_SUCCESS,
    payload: data
});

export const getRoomMessagesError = (error) => ({
    type: types.GET_ROOM_MESSAGES_FAILURE,
    payload: error
});

export const leaveRoomStart = (roomId) => ({
    type: types.LEAVE_ROOM_START,
    payload: roomId
});
export const leaveRoomSuccess = () => ({
    type: types.LEAVE_ROOM_SUCCESS
});
export const leaveRoomFailure = () => ({
    type: types.LEAVE_ROOM_FAILURE,
});



export const initRoomStart = (data) => ({
    type: types.INIT_ROOM_START,
    payload: data
});

export const initRoomSuccess = (data) => ({
    type: types.INIT_ROOM_SUCCESS,
    payload: data
});

export const initRoomFailure = (error) => ({
    type: types.INIT_ROOM_FAILURE,
    payload: error
});



export const getRoomsStart = (data) => ({
    type: types.GET_ROOMS_START,
    payload: data
});

export const getRoomsSuccess = (data) => ({
    type: types.GET_ROOMS_SUCCESS,
    payload: data
});

export const getRoomsFailure = (error) => ({
    type: types.GET_ROOMS_FAILURE,
    payload: error
});



export const getSystemContactsStart = (data) => ({
    type: types.GET_SYSTEM_CONTACTS_START,
    payload: data
});

export const getSystemContactsSuccess = (data) => ({
    type: types.GET_SYSTEM_CONTACTS_SUCCESS,
    payload: data
});

export const getSystemContactsFailure = (error) => ({
    type: types.GET_SYSTEM_CONTACTS_FAILURE,
    payload: error
});

export const setCurrentRoomStart = (room) => ({
    type: types.SELECT_CURRENT_ROOM_START,
    payload: room
})

export const setCurrentRoomSuccess = (room) => ({
    type: types.SELECT_CURRENT_ROOM_SUCCESS,
    payload: room
});

export const setCurrentRoomError = (error) => ({
    type: types.SELECT_CURRENT_ROOM_FAILURE,
    payload: error
});

export const addMessageStart = (message) => ({
    type: types.ADD_MESSAGE_START,
    payload: message
});

export const addMessageSuccess = (message) => ({
    type: types.ADD_MESSAGE_SUCCESS,
    payload: message
});

export const addMessageFailure = (error) => ({
    type: types.ADD_MESSAGE_START,
    payload: error
});

// CHAT CHANNEL ACTIONNS

export const startChannel = (token) => ({ type: types.START_CHANNEL, payload: token })

export const stopChannel = () => ({ type: types.STOP_CHANNEL })
