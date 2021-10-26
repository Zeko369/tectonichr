import React from "react";
import { NextPage } from "next";
import { Heading, Spinner, VStack, Text, UnorderedList, ListItem } from "@chakra-ui/react";

import { useUsersQuery } from "generated/graphql";

const HomePage: NextPage = () => {
  const [{ data, fetching, error }] = useUsersQuery();

  if (fetching) {
    return <Spinner />;
  }

  if (error) {
    return (
      <VStack>
        <Heading>Error</Heading>
        <Text>{error.message}</Text>
      </VStack>
    );
  }

  return (
    <UnorderedList>
      {data.users.map((u) => (
        <ListItem key={u.id}>{u.email}</ListItem>
      ))}
    </UnorderedList>
  );
};

export default HomePage;
