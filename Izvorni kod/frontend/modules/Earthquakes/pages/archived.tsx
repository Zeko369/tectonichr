import React from "react";
import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { Earthquakes } from "../components/Earthquakes";

const ArchivedEarthquakesPage: NextPage = () => {
  return (
    <Box h="calc(100vh - 64px)">
      <Earthquakes
        title="Arhivirani potresi"
        empty="Nema arhiviranih potresa"
        archived={true}
      />
    </Box>
  );
};

export default ArchivedEarthquakesPage;
