import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, all, cancel, select, takeLatest, takeLeading } from 'redux-saga/effects';
import history from '../../utils/history';
import EventBus from '../../utils/event-bus.utils';
import SOCKET_EVENTS from '../../constants/socket-events';
import types from './types';
import { http, refreshTokenAndHeaders } from '../../http';
import authTypes from '../auth/types';
import { getRoomsSuccess, setCurrentRoomSuccess, getRoomMessagesSuccess, setCurrentRoomError, getRoomsStart, addMessageSuccess, addMessageFailure, initRoomSuccess, initRoomFailure } from './actions';


function* connect() {
  const { auth: { token } } = yield select();
  const socket = yield io.connect('http://localhost:5000/chat', { query: { token } });
  return socket;
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on(SOCKET_EVENTS.CONNECTION, (message) => {
        console.log('CONNECTED');
    });
    socket.on(SOCKET_EVENTS.LEAVE, (message) => {
        console.log('LEAVING');
    });
    socket.on(SOCKET_EVENTS.ROOMS, (rooms) => {
      emit(getRoomsSuccess(rooms));
    });
    socket.on(SOCKET_EVENTS.JOIN_ROOM, (messages) => {
      emit(getRoomMessagesSuccess(messages));
    });
    socket.on(SOCKET_EVENTS.MESSAGE, (message) => {
      emit(addMessageSuccess(message));
    });
    socket.on('error', (status) => {
        console.warn('EXCETPION')
        refreshTokenAndHeaders();
    });
    socket.on(SOCKET_EVENTS.DISCONNECT, e => {
      // TODO: handle
    });
    return () => {
        socket.removeAllListeners();
    };
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    console.log(action);
    yield put(action);
  }
}

function* onInitRoom() {
    while(true) {
        const { payload: id } = yield take(types.INIT_ROOM_START);
        try {
            const req = {
                url: 'chat/rooms/init',
                method: 'POST',
                data: { id }
            };
            const data = yield http(req);
            yield put(initRoomSuccess(data));

            const { auth: { userId } } = yield select();
            yield put(getRoomsStart(userId));

            yield history.push(`/user/chat/${data._id}`, { id: data._id } );
            yield EventBus.publish('hideModal');
        } catch (error) {
            yield put(initRoomFailure(error));
        }  
    }
}

function* onGetRooms(socket) {
    while (true) {
        const { payload: userId } = yield take(types.GET_ROOMS_START);
        yield socket.emit(SOCKET_EVENTS.ROOMS, userId);
    }
};

function* onAddMessage(socket) {
    while(true) {
        const { payload: data } = yield take(types.ADD_MESSAGE_START);
        yield socket.emit(SOCKET_EVENTS.MESSAGE, data);
    }
}

function* onLeaveRoom(socket) {
    while(true) {
        const { payload: roomId } = yield take(types.LEAVE_ROOM_START);
        yield socket.emit(SOCKET_EVENTS.LEAVE, roomId);
    }   
}

function* onGetRoomMessages(socket) {
    while(true) {
        const { payload: room } = yield take(types.GET_ROOM_MESSAGES_START);
        yield socket.emit(SOCKET_EVENTS.JOIN_ROOM, room);
    }
} 


function* write(socket) { 
    yield all([
        call(onGetRooms, socket),
        call(onInitRoom),
        call(onSelectRoom),
        call(onAddMessage, socket),
        call(onLeaveRoom, socket),
        call(onGetRoomMessages, socket)]);
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}


function* onSelectRoom() {
    while(true) {
        const action = yield take(types.SELECT_CURRENT_ROOM_START);
        yield new Promise(res => setTimeout(() => res(), 1000))
        try { 
            const { payload } = action;
            yield put(setCurrentRoomSuccess(payload));
        } catch (error) {
            yield put(setCurrentRoomError(error));
        }
    }   
}


function* flow() {
    const socket = yield call(connect);
    const task = yield fork(handleIO, socket);
    socket.emit(SOCKET_EVENTS.CONNECTION); 

  while(true) {
    yield take(authTypes.SIGN_OUT_SUCCESS); 
    yield cancel(task); 
    socket.emit(SOCKET_EVENTS.LEAVE); 
    socket.disconnect(true);
  }
}

function* onServerStart() {
    yield takeLatest(types.START_CHANNEL, flow)
}

export function* chatNewSagas() {
  yield all([call(onServerStart)]);
}