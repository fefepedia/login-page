import React from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, authTokenVar } from "./apollo";
import { LogoutRouter } from "./routers/logout-router";
import { LoginRouter } from "./routers/login-router";

export default function App() {
  const isLoggedIn = useReactiveVar(authTokenVar);

  return (
    <ApolloProvider client={client}>
      {isLoggedIn ? <LoginRouter /> : <LogoutRouter />}
    </ApolloProvider>
  );
}
