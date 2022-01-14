import React from "react";
import { Button, Heading, HStack, Spinner, useBoolean } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { DownloadIcon } from "@chakra-ui/icons";

import { useEarthquakesQuery, useMeQuery } from "generated/graphql";
import { useDownloadEarthquake } from "modules/Export/hooks/useDownloadEarthquake";
import { useDownloadEarthquakes } from "modules/Export/hooks/useDownloadEarthquakes";

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

  const [includeSurveys, { toggle }] = useBoolean();

  const me = useMeQuery();
  const canSeeExport = ["ADMIN", "SEISMOLOGISTS"].includes(
    (!me.loading && !me.error && me.data?.me?.role) || ""
  );

  const baseKeys = ["id", "name", "count", "date"] as const;
  const keys = canSeeExport ? [...baseKeys, "export"] : baseKeys;

  const onDownloadEarthquake = useDownloadEarthquake(includeSurveys);
  const onDownloadEarthquakes = useDownloadEarthquakes();

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <DataTable
      data={data?.earthquakes || []}
      rawTitle={<Heading data-testid="title">{title}</Heading>}
      emptyText={empty}
      keys={keys}
      right={
        canSeeExport && (
          <HStack pb="2%">
            <Button onClick={onDownloadEarthquakes} colorScheme="facebook">
              Preuzmi sve potrese
            </Button>
            <Button onClick={toggle} colorScheme="facebook">
              {includeSurveys ? "Preuzmi i " : "Izuzmi"} upitnike
            </Button>
          </HStack>
        )
      }
      mapper={{
        id: true,
        name: true,
        count: (r) => r.surveys.length.toString(),
        date: (r) => new Date(r.date).toLocaleString(),
        export: (r) => (
          <Button
            colorScheme="teal"
            leftIcon={<DownloadIcon />}
            onClick={onDownloadEarthquake(r.id)}
          >
            Preuzmi
          </Button>
        ),
      }}
    />
  );
};
