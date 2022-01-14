import React, { useState } from "react";
import { Button, Flex, Heading, HStack, useBoolean } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { DownloadIcon } from "@chakra-ui/icons";
import { Input } from "chakra-form";

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

  const [name, setName] = useState("");
  const { loading, error, data } = useEarthquakesQuery({
    variables: { archived, filter: name || null },
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

  if (error) return <p>Error</p>;

  return (
    <DataTable
      data={data?.earthquakes || []}
      rawTitle={<Heading>{title}</Heading>}
      isLoading={loading}
      emptyText={empty}
      keys={keys}
      right={
        <Flex>
          <Input
            mr="2"
            noLabel
            value={name}
            placeholder="Search..."
            onChange={(e) => setName(e.target.value)}
          />

          {canSeeExport && (
            <HStack pb="2%">
              <Button onClick={onDownloadEarthquakes} colorScheme="facebook">
                Preuzmi sve potrese
              </Button>
              <Button onClick={toggle} colorScheme="facebook">
                {includeSurveys ? "Preuzmi i " : "Izuzmi"} upitnike
              </Button>
            </HStack>
          )}
        </Flex>
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
