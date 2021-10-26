import React from "react";
import { NextPage } from "next";
import { LinkButton } from "chakra-next-link";
import {
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

import { useUsersQuery } from "generated/graphql";

const HomePage: NextPage = () => {
  const [{ data, fetching, error }] = useUsersQuery();

  return (
    <VStack>
      <LinkButton href="/new">New</LinkButton>

      {fetching ? (
        <Spinner />
      ) : error ? (
        <VStack>
          <Heading>Error</Heading>
          <Text>{error.message}</Text>
        </VStack>
      ) : (
        <UnorderedList>
          {data.users.map((u) => (
            <ListItem key={u.id}>{u.email}</ListItem>
          ))}
        </UnorderedList>
      )}
    </VStack>
  );
};

export default HomePage;
