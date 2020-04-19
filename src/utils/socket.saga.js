// import io from 'socket.io-client';

// const CHAT_SOCKET_URL = 'http://localhost:5000/chat';

// let socket;

// const connect = () => {
//     socket = io(CHAT_SOCKET_URL);
//     return new Promise((resolve) => {
//       socket.on('connect', () => {
//         resolve(socket);
//       });
//     });
// };

// const disconnect = () => {
//     socket = io(CHAT_SOCKET_URL);
//     return new Promise((resolve) => {
//       socket.on('disconnect', () => {
//         resolve(socket);
//       });
//     });
//   };
  
//   const reconnect = () => {
//     socket = io(CHAT_SOCKET_URL);
//     return new Promise((resolve) => {
//       socket.on('reconnect', () => {
//         resolve(socket);
//       });
//     });
// };


// export default {
//     connect,
//     disconnect,
//     reconnect
// };