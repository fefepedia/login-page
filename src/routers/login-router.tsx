import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MainPage } from "../pages/main";

export const LoginRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
};
