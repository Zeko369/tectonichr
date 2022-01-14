import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
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
import { css, Global } from "@emotion/react";

import "mapbox-gl/dist/mapbox-gl.css";

import { Navigation } from "../components/Navigation";

export const serverUri =
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
      <title>TectonicHR</title>
      <Global
        styles={css`
          html,
          body,
          #__next {
            min-height: 100vh;
          }
        `}
      />

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
