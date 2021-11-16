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
  Container,
  Flex,
  Box,
  Center,
  Spacer,
  Image,
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  Link
} from "@chakra-ui/react";
import Header from "modules/Partials/header";

import { useUsersQuery } from "generated/graphql";

const HomePage: NextPage = () => {
  const [{ data, fetching, error }] = useUsersQuery();

  return (
    <VStack>  
      <Header />    
      <Container maxWidth="100%" p={10}>
        <Flex alignContent="center">
          <VStack width="50%" height="50%" alignItems="center">
            <Image src="/primjer-karte.jpg" alt= "Primjer karte potresa"></Image>
          </VStack>
          <VStack width="50%" height="50%" alignItems="center">
            <LinkButton href="/novipotresi" size="lg">Novi potres?</LinkButton>
            <LinkButton href="/aktualnipotresi">Aktualni potresi</LinkButton>
            <LinkButton href="/arhiviranipotresi">Arhivirani potresi</LinkButton>
          </VStack>
        </Flex>
      </Container>
      
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
      <LinkButton href="/new">New</LinkButton>
    </VStack>
  );
};

export default HomePage;
