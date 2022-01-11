import React from "react";
import { Spinner } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { useEarthquakesQuery } from "generated/graphql";

type EarthquakesProps = {
  archived: boolean;
  title: string;
  empty: string;
};

export const Earthquakes: React.FC<EarthquakesProps> = (props) => {
  const { archived, title, empty } = props;
  const { loading, error, data } = useEarthquakesQuery({
    variables: { archived },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <DataTable
      data={data?.earthquakes || []}
      title={title}
      emptyText={empty}
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
