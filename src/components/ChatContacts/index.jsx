import React from "react";
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Contact from "../Contact";
import ChatContactsForm from "../ChatContactsForm";

import contacts from '../../constants/contacts';
import socket_utils from '../../utils/socket.utils';
import { useSockets } from '../../socket/use-sockets';


import './style.scss';
import { useEffect } from "react";

import { selectCurrentUserId } from '../../redux/auth/selectors';
import { selectRooms } from '../../redux/chat/selectors';
import { getRoomsStart } from '../../redux/chat/actions';

const ChatContacts = ({ className, userId, rooms, getRooms }) => {
  const history = useHistory();
  const location = useLocation();
  const { id = '' } = location.state || {};
  const match = useRouteMatch();

  useEffect(() => {
    console.log('get rooms from component');
    userId && getRooms(userId);
  }, [userId])
  
  return (
    <ul className={`chat-contacts-wr scrollbar ${className}`}>
      <ChatContactsForm/>
      {
        rooms && rooms.map(room =>
          (<Contact
          userId={userId}
          isActive={id === room._id}
          key={room._id}
          onClick={() => history.push(`${match.path}/${room._id}`, { id: room._id } )}
          room={room}/>))
      }
    </ul>
)
};


const mapStateToProps = createStructuredSelector({
  userId: selectCurrentUserId,
  rooms: selectRooms
})

const mapDispatchToProps = dispatch => ({
  getRooms: userId => dispatch(getRoomsStart(userId)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContacts);
