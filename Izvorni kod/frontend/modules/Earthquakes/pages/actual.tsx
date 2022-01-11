import React from "react";
import { NextPage } from "next";
import { Earthquakes } from "../components/Earthquakes";

const ActualEarthquakesPage: NextPage = () => {
  return (
    <Earthquakes
      title="Aktualni potresi"
      empty="Nema aktualnih potresa"
      archived={false}
    />
  );
};

export default ActualEarthquakesPage;
