import React from "react";
import { NextPage } from "next";
import { LinkButton } from "chakra-next-link";
import {
  Container,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";

const HomePage: NextPage = () => {
  return (
    <VStack>
      <Container maxWidth="100%" p={10}>
        <Flex alignContent="center">
          <VStack width="50%" height="50%" alignItems="center">
            <Image src="/primjer-karte.jpg" alt="Primjer karte potresa"></Image>
          </VStack>
          <VStack width="50%" height="50%" alignItems="center">
            <LinkButton href="/surveys/new" size="lg">
              Novi potres?
            </LinkButton>
            <LinkButton href="/earthquakes/actual" size="lg">
              Aktualni potresi
            </LinkButton>
            <LinkButton href="/earthquakes/archived" size="lg">
              Arhivirani potresi
            </LinkButton>
          </VStack>
        </Flex>
      </Container>
    </VStack>
  );
};

export default HomePage;
