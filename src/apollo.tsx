import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://z0127.sse.codesandbox.io/graphql",
  cache: new InMemoryCache(),
});

export const authTokenVar = makeVar<null | string>(null);
