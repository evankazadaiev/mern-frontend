import types from './types';

const INITIAL_STATE = {
    channelStatus: 'off',
    serverStatus: 'unknown',
    rooms: null,
    messages: null,
    currentRoom: null
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANNEL_ON:
        return {
            ...state,
            channelStatus: 'on'
        }
    case types.GET_ROOMS_SUCCESS:
        return {
            ...state,
            rooms: action.payload
        }
    case types.SELECT_CURRENT_ROOM_SUCCESS: 
        return {
            ...state,
            currentRoom: action.payload
        }
    case types.GET_ROOM_MESSAGES_SUCCESS:
        return {
            ...state,
            messages: action.payload
        }
    case types.CHANNEL_OFF:
        return {
            ...state,
            channelStatus: 'off',
            serverStatus: 'unknown'
        }
    case types.ADD_MESSAGE_SUCCESS:
        return {
            ...state,
            messages: [...state.messages, action.payload]
        }
    case types.SERVER_OFF:
        return {...state, serverStatus: 'off'};
    case types.SERVER_ON:
        return {...state, serverStatus: 'on'};
    default:
      return state;
  }
};

export default chatReducer;
