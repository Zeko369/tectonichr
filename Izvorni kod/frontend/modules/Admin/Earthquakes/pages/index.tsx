import React from "react";
import { NextPage } from "next";
import { Spinner, Container, VStack, Checkbox } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";

import { useEarthquakesQuery, useSurveysQuery } from "generated/graphql";

const UnmergedSurveys: React.FC = () => {
  const { loading, error, data } = useSurveysQuery();

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <DataTable
      title="Unmerged surveys"
      data={data?.surveys || []}
      keyFunc={(r) => r.id.toString()}
      keys={["select", "id", "date"] as const}
      mapper={{
        select: (r) => <Checkbox />,
        id: true,
        date: (r) => r.createdAt,
      }}
    />
  );
};

const Earthquakes: React.FC = () => {
  const { loading, error, data } = useEarthquakesQuery();
  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <DataTable
      data={data?.earthquakes || []}
      title="Earthquakes"
      keys={["id", "name", "count", "date"] as const}
      mapper={{
        id: true,
        name: true,
        count: (r) => r.surveys.length.toString(),
        date: (r) => r.date,
      }}
    />
  );
};

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
