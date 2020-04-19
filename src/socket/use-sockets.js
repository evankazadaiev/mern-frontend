// import React, { useState, useEffect } from 'react';
// import { socket } from '../utils/socket.utils';

// export const useSockets = () => {
//   const [rooms, setRooms] = useState(null);
//   const [currentRoom, setCurrentRoom] = useState(null); 
//   const getUserId = () => localStorage.getItem('id');
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState(null);
  
//   const getRooms = () => {
//     socket.emit('rooms', getUserId());
//   }

//   const joinRoom = (roomId) => {
//     socket.emit('join_room', roomId);
//   };

//   const leaveRoom = (roomId) => {
//     socket.emit('leave', roomId);
//   };

//   const sendMessage = ({ roomId, message }) => {
//     socket.emit('message', {roomId, message});
//   };

//   const onRooms = () => {
//     socket.on('rooms', (rooms) => {
//       setRooms(rooms); 
//    })
//   };
//   const onJoin = () => {
//     socket.on('join_room', (messages) => {
//       setMessages(messages);
//     })
//   };
//   const onMessage = () => {
//     socket.on('message', (message) => {
//       // const newMessages = [...messages].push(message);
//       setNewMessage(message);
//       // setMessages(newMessages);
//     })
//   }

//   useEffect(() => {
//     onRooms();
//     onJoin();
//     onMessage();
    
//     // getRooms();
//   }, [])

//   return { getRooms, messages, joinRoom, leaveRoom, sendMessage, currentRoom, setCurrentRoom, rooms, newMessage };
// }