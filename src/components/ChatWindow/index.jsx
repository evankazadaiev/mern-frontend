import React from "react";
import { Route, useRouteMatch } from 'react-router-dom';

import ChatContacts from "../ChatContacts";
import ChatMessaging from "../ChatMessaging";
import NewMessageWindow from "../NewMessageWindow";

import { useSockets } from '../../socket/use-sockets';

import './style.scss';

const ChatWindow = () => {
  const match = useRouteMatch();
  // const sockets = useSockets();
  // const { rooms } = useSockets();

  return (
    <div className="chat_window">
      <ChatContacts className="chat_window_contacts"/>
      <Route exact strict path={`${ match.path }`} component={ChatMessaging}/>
      <Route exact strict path={`${ match.path }/write/new-message`} component={NewMessageWindow} />
      <Route exact strict path={`${ match.path }/:id`} component={ChatMessaging}/>
  </div>
  )
};


export default ChatWindow;
