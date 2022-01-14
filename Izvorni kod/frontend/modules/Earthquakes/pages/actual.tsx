import React from "react";
import { NextPage } from "next";
import { Earthquakes } from "../components/Earthquakes";
import { Box } from "@chakra-ui/react";

const ActualEarthquakesPage: NextPage = () => {
  return (
    <Box h="calc(100vh - 64px)">
      <Earthquakes
        title="Aktualni potresi"
        empty="Nema aktualnih potresa"
        archived={false}
      />
    </Box>
  );
};

export default ActualEarthquakesPage;
