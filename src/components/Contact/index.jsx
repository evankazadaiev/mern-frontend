import React, {useMemo, useContext} from "react";
import DefaultUserIcon from '../../assets/default-user.svg';

import './style.scss';
import { AuthContext } from "../../context/AuthContext";

const Contact = ({ onClick, userId, room, isActive }) => {
  const { _id, users, lastMessage } = room;
  const { createdAt = '', text = 'No messages yet', id = 1 } = lastMessage || {};

  const wrapperClasses = useMemo(() => `dialog ${isActive ? 'active' : ''}`, [isActive]);
  console.log(users);
  const { profilePhoto = undefined, name, surname } = users.find(user => user._id !== userId) || {};
  
  const messageTime = useMemo(() => {
    if (!createdAt) return '';
    const fullDate = new Date(createdAt);
    let hours = fullDate.getHours();
    let minutes = fullDate.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const time = `${hours}:${minutes} ${amOrPm}`;
    return time;
  }, [createdAt]);
  
  return (
    <li className={wrapperClasses}>
      <a onClick={onClick} className="dialog-inner">
        <div className="left">
          <div className="dialog-photo">
            <img className="dialog-photo" src={profilePhoto || DefaultUserIcon} alt=""/>
          </div>
          <div className="dialog-message-wrap">
            <h3 className="dialog-title">{ name } { surname }</h3>
            <span className="dialog-last_message">{ text }</span>
          </div>
        </div>
        <div className="dialog-meta">
          <span className="dialog-date">{ messageTime }</span>
          <span className="dialog-unread-count">12</span>
        </div>
      </a>
    </li>
)
};


export default Contact;
