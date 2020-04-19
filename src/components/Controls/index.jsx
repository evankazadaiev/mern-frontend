import React, {useState} from "react";
import { connect } from 'react-redux';

import AttachIcon from '../../assets/attach-icon.svg';
import SendIcon from '../../assets/send-btn.svg';
import socket_utils from '../../utils/socket.utils';


import { addMessageStart } from '../../redux/chat/actions';

import './style.scss';

const Controls = ({ currentRoom, userId, sendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleChange = e => setMessage(e.target.value);
  
  const handleSubmit = async e => {
    e.preventDefault();

    const { users, _id } = currentRoom;
    const userFrom = userId;
    const userTo = users.find(u => u._id !== userFrom);
    const data = {
      roomId: _id,
      message: { 
        userFrom, 
        userTo: userTo._id,
        room: _id, 
        type: 'text',
        content: message }
    };
    if (message.length > 0) {
      await sendMessage(data);
      setMessage('');
      console.log('after message sent', message);
    }
  };

  const onKeyDown = (event) => {
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit(event);
    }
  }
  
  return (
    <form className="controls-wr" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <textarea
          onChange={handleChange}
          value={message}
          onKeyDown={onKeyDown}
          className="scrollbar"/>
        <div className="buttons-wr">
          <label className="attach-btn">
            <img src={AttachIcon} alt={''}/>
            <input type="file" hidden/>
          </label>
          <button className="send-btn">
            <img src={SendIcon} alt=""/>
          </button>
        </div>
      </div>
    </form>
)
};

const mapDispatchToProps = dispatch => ({
  sendMessage: (data) => dispatch(addMessageStart(data))
});


export default connect(null, mapDispatchToProps)(Controls);
