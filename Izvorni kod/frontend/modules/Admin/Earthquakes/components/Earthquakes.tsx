import React from "react";
import { Spinner } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";

import { useEarthquakesQuery } from "generated/graphql";

export const Earthquakes: React.FC = () => {
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
        date: (r) => new Date(r.date).toLocaleString(),
      }}
    />
  );
};
