import React from "react";
import {Link, useRouteMatch} from 'react-router-dom';

import Table from "../UI/Table";

import './styles.scss';

const UsersTable = ({ users }) => {
  
  return (
    <Table heads={['name', 'surname', 'role', 'email', 'ID', 'Edit', 'Delete']}>
      { users &&
      users.map(u => (
        <tr key={u._id}>
          <td>{ u.name }</td>
          <td>{u.surname}</td>
          <td>{ u.role }</td>
          <td>{ u.email }</td>
          <td>{ u._id }</td>
          <td className="action"><Link to={`/admin/update/${u._id}`}><i className="fa fa-edit"/></Link></td>
          <td className="action remove"><a><i className="fa fa-trash"/></a></td></tr>
          
      )) }
    </Table>
  )
};

export default UsersTable;
