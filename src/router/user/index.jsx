import React from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import UserHome from "../../pages/UserHome";
import ProfilePage from "../../pages/ProfilePage";
import ChatPage from "../../pages/ChatPage";

const routes = [
  {
    path: '/user/home',
    exact: true,
    component: () => <UserHome/>
  },
  {
    path: '/user/profile',
    exact: true,
    component: () => <ProfilePage/>
  },
  {
    path: '/user/chat',
    component: () => <ChatPage/>,
  },
];

const UserRoutes = () => (
  <Switch>
    {routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    ))}
    <Redirect to="/user/home"/>
  </Switch>
);


export default UserRoutes;
