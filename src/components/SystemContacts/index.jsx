import React, { useEffect } from "react";
import history from '../../utils/history';
import DefaultUserIcon from '../../assets/default-user.svg';
import './style.scss';

import EventBus from '../../utils/event-bus.utils';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectCurrentUserId } from '../../redux/auth/selectors';
import { selectUsers, selectTotal } from '../../redux/users/selectors';
import { getUsersStart } from '../../redux/users/actions';
import { initRoomStart, getRoomsStart } from '../../redux/chat/actions';


const SystemContacts = ({ getUsers, total, getRooms, userId, users, initRoom }) => {
  const pageInfo = {
    page: 1,
    pageSize: 20
  };

  const handleInitRoom = id => () => {
    initRoom(id);
  };
  
  useEffect(() => {
    getUsers(pageInfo);
  }, [getUsers]);

  return (
    <div className="system-contacts-wr scrollbar">
      { users && users.map(user => (
        <div key={user._id} onClick={handleInitRoom(user._id)} className="system_contact">
          <div className="photo-wr">
            <img src={user.profilePhoto || DefaultUserIcon} alt=""/>
          </div>
          <div className="meta">
            <h4 className="user-fullname">{ user.name } { user.surname }</h4>
            <span>Last seen recently</span>
          </div>
        </div>
      )) }
    </div>
  )
};


const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  total: selectTotal,
  userId: selectCurrentUserId
});

const mapDispatchToProps = dispatch => ({
  getUsers: (pageInfo) => dispatch(getUsersStart(pageInfo)),
  initRoom: (userId) => dispatch(initRoomStart(userId)),
  getRooms: (ownId) => dispatch(getRoomsStart(ownId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SystemContacts);
