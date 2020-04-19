import React, {useState} from "react";

import UsersTable from '../../components/UsersTable/';

import './styles.scss';


const AdminHome = () => {  
  return (
      <div className="page-wr">
        <UsersTable/>
      </div>
  )
};

export default AdminHome;
