import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import Sidebar from "../../components/Sidebar";
import AdminHome from "../../pages/AdminHome";
import CreateUserPage from "../../pages/CreateUserPage";

const routes = [
  {
    path: '/admin/home',
    exact: true,
    sidebar: () => <Sidebar/>,
    main: () => <AdminHome/>
  },
  {
    path: '/admin/create',
    exact: true,
    sidebar: () => <Sidebar/>,
    main: () => <CreateUserPage mode={'CREATE'}/>
  },
  {
    path: '/admin/update/:id',
    exact: true,
    sidebar: () => <Sidebar/>,
    main: () => <CreateUserPage mode={'UPDATE'}/>
  }
];

const AdminRoutes = () => (
    <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      <Redirect to="/admin/home"/>
    </Switch>
);


export default AdminRoutes;
