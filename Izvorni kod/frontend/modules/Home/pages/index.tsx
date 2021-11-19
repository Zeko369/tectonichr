import React from "react";
import { NextPage } from "next";
import { LinkButton } from "chakra-next-link";
import { VStack, Container, Flex, Image } from "@chakra-ui/react";

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
            <LinkButton href="/aktualnipotresi">Aktualni potresi</LinkButton>
            <LinkButton href="/arhiviranipotresi">
              Arhivirani potresi
            </LinkButton>
          </VStack>
        </Flex>
      </Container>
    </VStack>
  );
};

export default HomePage;
