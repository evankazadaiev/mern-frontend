import React from 'react';
import {NavLink} from "react-router-dom";

export const useLinks = (role) => {
  switch (role) {
    case 'SUPER_ADMIN':
      return (
        <>
          <li><NavLink to="/admin/create">Create</NavLink></li>
        </>
      );
    default:
      return (<></>)
  }
};
