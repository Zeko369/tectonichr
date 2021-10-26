import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ConfirmContextProvider } from "chakra-confirm";
import { createClient, Provider } from "urql";

const client = createClient({
  url: process.env.NEXT_PUBLIC_APOLLO_SERVER || "http://localhost:5000/graphql",
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider>
        <ConfirmContextProvider>
          <Component {...pageProps} />
        </ConfirmContextProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
