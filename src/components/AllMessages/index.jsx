import React from "react";

import Message from '../Message/';

const AllMessages = ({ messages, userId }) => {
  if(!messages) return null;
  return (
    messages.map(m => (<Message key={m._id} userId={userId} message={m} />))
  )
};

export default AllMessages;
