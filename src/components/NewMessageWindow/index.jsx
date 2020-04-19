import React, { useState, useEffect } from "react";
import Controls from "../Controls";
import SystemContacts from "../SystemContacts";

import { useServices } from "../ContactsModal/services.hook";

import './style.scss';

const NewMessageWindow = () => {
  const [users, setUsers] = useState(null);
  const { getUsersTable, loading } = useServices();
  
  const getUsers = async () => {
    const pageInfo = {
      page: 1,
      pageSize: 20
    };
    
    const { data, total } = await getUsersTable(pageInfo) || {};
    setUsers(data);
  };
  
  useEffect(() => {
    getUsers();
  }, []);
  
  return (
    <div className="messaging chat_window_messaging">
      <SystemContacts users={users}/>
      <Controls/>
    </div>
  )
};


export default NewMessageWindow;

