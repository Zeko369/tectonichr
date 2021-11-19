import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ConfirmContextProvider } from "chakra-confirm";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AppProps } from "next/app";

import { Navigation } from "../components/Navigation";

const serverUri =
  process.env.NEXT_PUBLIC_APOLLO_SERVER || "http://localhost:5000/graphql";

const httpLink = createHttpLink({ uri: serverUri });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <ConfirmContextProvider>
          <Navigation />

          <Component {...pageProps} />
        </ConfirmContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
