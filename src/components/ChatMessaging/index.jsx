import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { usePreviousId } from '../../hooks/use-previous.hook';
import MessagesWrapper from "../MessagesWrapper";
import AllMessages from "../AllMessages";
import Controls from "../Controls";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUserId } from "../../redux/auth/selectors";
import { selectRooms, selectRoomMessages, selectCurrentRoom } from '../../redux/chat/selectors';
import { getRoomMessagesStart, leaveRoomStart } from '../../redux/chat/actions';
import { setCurrentRoomStart } from '../../redux/chat/actions'
import socket_utils from '../../utils/socket.utils';

import './style.scss';

const ChatMessaging = ({ userId, rooms, messages, currentRoom, setCurrentRoomStart, getRoomMessages, leaveRoom }) => {
  const location = useLocation();
  const { id = '' } = location.state || {};
  const prevId = usePreviousId(id);

  const getMessages = useCallback(async (id) => {
    if(!id) return; 
    await leaveRoom(prevId);
    await getRoomMessages(id);
  }, [id]);

  useEffect(() => {
    getMessages(id);
  }, [id]);

  useEffect(() => {
    const room = rooms && rooms.find(r => r._id === id);
    if(room) setCurrentRoomStart(room)
  }, [id, rooms])

  
  return (
    <div key={id} className="messaging chat_window_messaging">
      <MessagesWrapper messages={<AllMessages userId={userId} messages={messages}/>}/>
      <Controls currentRoom={ currentRoom } userId={userId} />
  </div>
  )
};

const mapStateToProps = createStructuredSelector({
    rooms: selectRooms,
    messages: selectRoomMessages,
    currentRoom: selectCurrentRoom,
    userId: selectCurrentUserId
});

const mapDispatchToProps = dispatch => ({
  setCurrentRoomStart: (room) => dispatch(setCurrentRoomStart(room)),
  getRoomMessages: (roomId) => dispatch(getRoomMessagesStart(roomId)),
  leaveRoom: (roomId) => dispatch(leaveRoomStart(roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessaging);

