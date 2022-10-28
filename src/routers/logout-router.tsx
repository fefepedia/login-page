import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginPage } from "../pages/login";

export const LogoutRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};
