import React from "react";
import { NextPage } from "next";
import { Container, VStack } from "@chakra-ui/react";

import { UnmergedSurveys } from "../components/UnmergedSurveys";
import { Earthquakes } from "../components/Earthquakes";

const EarthquakesPage: NextPage = () => {
  return (
    <Container>
      <VStack spacing="20">
        <UnmergedSurveys />
        <Earthquakes />
      </VStack>
    </Container>
  );
};

export default EarthquakesPage;
