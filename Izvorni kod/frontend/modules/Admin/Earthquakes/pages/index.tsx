import React from "react";
import { NextPage } from "next";
import { Container, VStack, Box } from "@chakra-ui/react";

import { UnmergedSurveys } from "../components/UnmergedSurveys";
import { Earthquakes } from "../components/Earthquakes";

const EarthquakesPage: NextPage = () => {
  return (
    <Box bg="#3939a4" minH="calc(100vh - 64px)" p="5%" opacity="0.9">
      <Container border="4px" borderColor="#3934a4" borderRadius="20px" padding="5%" bgColor="white" minW="80%">
        <VStack>
          <UnmergedSurveys />
        </VStack>
      </Container>
      <Container border="4px" borderColor="#3934a4" borderRadius="20px" padding="5%" bgColor="white" minW="80%">
        <VStack>
          <Earthquakes />
        </VStack>
      </Container>
    </Box>    
  );
};

export default EarthquakesPage;