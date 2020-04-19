import React from "react";
import { connect } from 'react-redux';
import ChatWindow from "../../components/ChatWindow";
import { startChannel } from '../../redux/chat/actions';
import socket_utils from '../../utils/socket.utils';
import { useEffect } from "react";

const ChatPage = () => {
  return (
    <div className="chat-page">
      <ChatWindow/>
    </div>
  )
};

export default ChatPage;
