import React from "react";
import { NextPage } from "next";
import { LinkButton } from "chakra-next-link";
import { Container, Flex, Heading, VStack } from "@chakra-ui/react";
import { groupBy } from "lodash";

import { useSurveysQuery } from "generated/graphql";
import { Marker } from "../components/Marker";
import { Map } from "../components/Map";

const HomePage: NextPage = () => {
  const surveys = useSurveysQuery();
  const groupedBy = groupBy(
    surveys.data?.surveys || [],
    (a) => `${a.lng}|${a.lat}`
  );

  return (
    <Container maxWidth="100%" p={10} h="calc(100vh - 64px)">
      <Flex alignContent="center" h="full">
        <VStack width="50%" pb="16" alignItems="center">
          <Heading size="md">Zadnji prijavljeni potresi</Heading>

          <Map>
            {(surveys.data?.surveys || []).map((survey) => (
              <Marker
                key={survey.id.toString()}
                coordinates={[survey.lng, survey.lat]}
              >
                {groupedBy[`${survey.lng}|${survey.lat}`].length}
              </Marker>
            ))}
          </Map>
        </VStack>
        <VStack width="50%" alignItems="center">
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
  );
};

export default HomePage;
