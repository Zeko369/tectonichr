import React from "react";
import { NextPage } from "next";
import { Earthquakes } from "../components/Earthquakes";

const ArchivedEarthquakesPage: NextPage = () => {
  return (
    <Earthquakes
      title="Arhivirani potresi"
      empty="Nema arhiviranih potresa"
      archived={true}
    />
  );
};

export default ArchivedEarthquakesPage;
