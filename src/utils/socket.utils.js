import io from 'socket.io-client';
import SOCKET_EVENTS from '../constants/socket-events';
// import reduxStore from '../redux/store'

// const getToken = () => {
//     const { store } = reduxStore;
//     const { auth } = store.getState();
//     const { token } = auth;
    
//     return token;
//   };

export const getSocket = (token) => io.connect('http://localhost:5000/chat', { query: { token } });

export default (function() {
    return {
        async connect() {
            return getSocket().emit(SOCKET_EVENTS.CONNECTION);
        },
        async disconnect() {
            return getSocket().emit(SOCKET_EVENTS.DISCONNECT);
        },
        async leave(roomId) {
            return getSocket().emit(SOCKET_EVENTS.LEAVE, roomId);
        },
        async joinRoom(roomId) {
            return getSocket().emit(SOCKET_EVENTS.JOIN_ROOM, roomId); 
        },
        async getRooms(userId) {
            return getSocket().emit(SOCKET_EVENTS.ROOMS, userId);   
        },
        async sendMessage({ roomId, message }) {
            return getSocket().emit(SOCKET_EVENTS.MESSAGE, {roomId, message});
        }
    }
})();