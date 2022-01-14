import React from "react";
import { NextPage } from "next";
import { LinkButton } from "chakra-next-link";
import { Container, Flex, Heading, VStack } from "@chakra-ui/react";
import { groupBy } from "lodash";

import { useLastSurveysQuery } from "generated/graphql";
import { Marker } from "../components/Marker";
import { Map } from "../components/Map";

const HomePage: NextPage = () => {
  const surveys = useLastSurveysQuery();
  const groupedBy = groupBy(
    surveys.data?.surveys || [],
    (a) => `${a.lng}|${a.lat}`
  );

  return (
    <Container
      maxWidth="100%"
      p={10}
      h="calc(100vh - 64px)"
      bg="#3939a4"
      opacity="0.9"
    >
      <Flex alignContent="center" h="full">
        <VStack width="50%" pb="16" alignItems="center">
          <Heading size="md" color="white">
            Karta potresa
          </Heading>

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
        <VStack width="50%" alignItems="center" justifyContent="center">
          <LinkButton
            href="/surveys/new"
            size="lg"
            width="38%"
            height="18%"
            background="white"
            fontSize="1.5rem"
            color="teal"
          >
            Novi potres?
          </LinkButton>
          <LinkButton
            href="/earthquakes/actual"
            size="lg"
            width="38%"
            height="18%"
            background="white"
            fontSize="1.5rem"
            color="teal"
          >
            Aktualni potresi
          </LinkButton>
          <LinkButton
            href="/earthquakes/archived"
            size="lg"
            width="38%"
            height="18%"
            background="white"
            fontSize="1.5rem"
            color="teal"
          >
            Arhivirani potresi
          </LinkButton>
        </VStack>
      </Flex>
    </Container>
  );
};

export default HomePage;
