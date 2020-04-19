// import { take, call, all, put, cancelled, takeLatest } from 'redux-saga/effects';
// import { http } from '../../http';

// import { createRoomsChannel, createRoomMessagesChannel, createOnMessageChannel, createSocketConnectionChannel } from './channel';
// import { getRoomsSuccess, setCurrentRoomSuccess, getRoomMessagesStart, getRoomMessagesSuccess, 
//     getRoomMessagesError, setCurrentRoomError, 
//     addMessageStart, addMessageSuccess, addMessageFailure, initRoomSuccess, initRoomFailure } from './actions';


// import types from './types';

// // export function* roomsSaga() {
// //   const channel = yield call(createRoomsChannel);
// //     while (true) {
// //         try {
// //             const rooms = yield take(channel);
// //             const action = getRoomsSuccess(rooms);
// //             console.log('get rooms')
// //             yield put(action);
// //         } catch(error) { console.log('CATCH ERROR!!!!!!!!!!') } 
// //     }
// // };

// // export function* roomMessagesSaga() {
// //     const channel = yield call(createRoomMessagesChannel);

// //     try {
// //         yield put(getRoomMessagesStart());
    
// //         while(true) {
// //             console.log('GETTING MESSAGES');
// //             const messages = yield take(channel);

// //             if(Array.isArray(messages)) {
// //                 const action = getRoomMessagesSuccess(messages);

// //                 yield put(action);
// //             }
// //         } 
// //     } catch (error) {
// //         console.log('CATCH ERROR');
// //         yield put(getRoomMessagesError(error))
// //     } finally {
// //         if (yield cancelled()) channel.close();
// //     }
// // };

// // export function* onMessageSaga() {
// //     const channel = yield call(createOnMessageChannel);
// //     try {
// //     yield put(addMessageStart());

// //     while(true) {
// //             const message = yield take(channel);
            
// //             const action = addMessageSuccess(message);

// //             yield put(action);
// //         } 
// //     } catch (error) {
// //         yield put(addMessageFailure(error));
// //     } finally {
// //         if (yield cancelled()) channel.close();
// //     }
// // }

// export function* selectCurrentRoom(action) {
//     yield new Promise(res => setTimeout(() => res(), 1000))
//     try { 
//         const { payload } = action;
//         yield put(setCurrentRoomSuccess(payload));
//     } catch (error) {
//         yield put(setCurrentRoomError(error));
//     }
// }

// export function* initRoom(action) {
//     const { payload: id } = action;
//     try {
//         const req = {
//             url: 'chat/rooms/init',
//             method: 'POST',
//             data: { id }
//           };
//           const data = yield http(req);
//           yield put(initRoomSuccess(data));
//     } catch (error) {
//           yield put(initRoomFailure(error));
//     }   
// }


// export function* initSocketConnection(action) {
//     const { payload: token } = action;
//     createSocketConnectionChannel(token);
// }


// export function* onSelectRoomSaga() { 
//     yield takeLatest(types.SELECT_CURRENT_ROOM_START, selectCurrentRoom);
// }

// export function* onInitRoom() { 
//     yield takeLatest(types.INIT_ROOM_START, initRoom);
// }

// export function* onStartChannel() {
//     yield takeLatest(types.START_CHANNEL, initSocketConnection);
// }



// export function* chatSagas() {
//     yield all([
//         call(onStartChannel),
//     //   call(roomsSaga),
//     //   call(roomMessagesSaga),
//       call(onSelectRoomSaga),
//     //   call(onMessageSaga),
//       call(onInitRoom)
//     ])
//   }
  