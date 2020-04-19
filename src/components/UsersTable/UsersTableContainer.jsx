import React, {useEffect, useState, useContext} from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { getUsersStart } from '../../redux/users/actions';
import { selectUsers, selectTotal } from '../../redux/users/selectors';

import {useDebounce} from "../../hooks/debounce.hook";
import Loader from "../Loader/";
import Pagination from "rc-pagination";
import UsersTable from "./UsersTable";
import TableFilters from '../TableFilters';

const UsersTableContainer = ({ getUsers, users, total }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState({
    search: ''
  });
  const debouncedFilters = useDebounce(filters, 1000);
  
  useEffect(() => {
    let subscribed = true;
    const pageInfo = {
      page,
      pageSize,
      ...filters
    };

    subscribed && getUsers(pageInfo);
    return () => (subscribed = false)
  }, [page, debouncedFilters]);
  
  if (!users) return <Loader/>;
  
  return (
    <>
    <TableFilters filters={filters} setFilters={setFilters} />  
    <div className="table-wrapper">
      <UsersTable users={users}/>
      <Pagination
        prevIcon={<a><i className="fa fa-chevron-left"/></a>} 
        nextIcon={<a><i className="fa fa-chevron-right"/></a>} 
        total={total}
        current={page}
        onChange={(current) => setPage(current)}
        pageSize={pageSize} />
    </div>
    </>
  )
};

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  total: selectTotal
});

const mapDispatchToProps = dispatch => ({
  getUsers: (pageInfo) => dispatch(getUsersStart(pageInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersTableContainer);
