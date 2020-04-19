import { eventChannel, END  } from 'redux-saga';
import { take, call, all, put, cancelled, takeLatest } from 'redux-saga/effects';
import SOCKET_EVENTS from '../../constants/socket-events';
import io from 'socket.io-client';
import { getSocket } from '../../utils/socket.utils';
import { getRoomsSuccess, setCurrentRoomSuccess, getRoomMessagesStart, getRoomMessagesSuccess, 
  getRoomMessagesError, setCurrentRoomError, 
  addMessageStart, addMessageSuccess, addMessageFailure, initRoomSuccess, initRoomFailure } from './actions';



const CHAT_SOCKET_URL = 'http://localhost:5000/chat';

// let socket;
// const connect = () => {
//   socket = io(CHAT_SOCKET_URL);
//   return new Promise((resolve) => {
//     socket.on('connect', () => {
//       resolve(socket);
//     });
//   });
// };


export function createSocketConnectionChannel(token) {
  const socket = getSocket(token);
  console.log('event channel created');
  return eventChannel(emit => {

    function* handleReceiveRooms(rooms){
          // const rooms = yield take(channel);
          console.log(rooms);
          const action = getRoomsSuccess(rooms);
          console.log('get rooms', rooms);
          yield put(action);
    };

    socket.on(SOCKET_EVENTS.ROOMS, handleReceiveRooms);


    return () => {
      socket.removeAllListeners();
    }
  });

};



// export function createRoomsChannel() {
//   const subscribe = emitter => {    
//     socket.on(SOCKET_EVENTS.ROOMS, emitter);

//     return () => socket.removeListener(SOCKET_EVENTS.ROOMS, emitter);
//   };

//   return eventChannel(subscribe);
// }

// export function createRoomMessagesChannel() {

//   const subscribe = emitter => {    
//     socket.on(SOCKET_EVENTS.JOIN_ROOM, emitter);

//     return () => socket.removeListener(SOCKET_EVENTS.JOIN_ROOM, emitter);
//   };

//   return eventChannel(subscribe);
// }

// export function createOnMessageChannel() {
//   const subscribe = emitter => {    
//     socket.on(SOCKET_EVENTS.MESSAGE, emitter);

//     return () => socket.removeListener(SOCKET_EVENTS.MESSAGE, emitter);
//   };

//   return eventChannel(subscribe);
// }