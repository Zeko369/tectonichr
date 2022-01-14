import React from "react";
import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { Earthquakes } from "../components/Earthquakes";

const ActualEarthquakesPage: NextPage = () => {
  return (
    <Box h="calc(100vh - 64px)" >
      <Earthquakes
        title="Aktualni potresi"
        empty="Nema aktualnih potresa"
        archived={false}
      />
    </Box>
  );
};

export default ActualEarthquakesPage;
