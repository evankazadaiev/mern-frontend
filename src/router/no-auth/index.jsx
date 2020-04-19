import React from "react";
import LoginPage from "../../pages/LoginPage";
import SignUpPage from "../../pages/SignUpPage";
import { Switch, Redirect, Route } from "react-router-dom";


const NoAuthRoutes = () => (
  <Switch>
    <Route path="/login" exact>
      <LoginPage/>
    </Route>
    <Route path="/sign-up" exact>
      <SignUpPage/>
    </Route>
    <Redirect to="/login"/>
  </Switch>
);

export default NoAuthRoutes;
