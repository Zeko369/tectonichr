import React, { useState } from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { DownloadIcon } from "@chakra-ui/icons";
import { Input } from "chakra-form";

import { useEarthquakesQuery, useMeQuery } from "generated/graphql";
import { useDownloadEarthquake } from "modules/Export/hooks/useDownloadEarthquake";
import { useDownloadEarthquakes } from "modules/Export/hooks/useDownloadEarthquakes";
import { Map } from "../../Home/components/Map";
import { Marker } from "../../Home/components/Marker";

type EarthquakesProps = {
  archived: boolean;
  title: string;
  empty: string;
};

const getMarkerColor = (strength: number) => {
  if (strength < 4) return "green";
  if (strength < 7) return "orange";
  return "red";
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

  const baseKeys = [
    "id",
    "name",
    "strength",
    "epicenterLng",
    "epicenterLat",
    "date",
  ] as const;
  const keys = canSeeExport ? [...baseKeys, "export"] : baseKeys;

  const onDownloadEarthquake = useDownloadEarthquake(includeSurveys);
  const onDownloadEarthquakes = useDownloadEarthquakes();

  if (error) return <p>Error</p>;

  return (
    <Grid gridTemplateColumns="repeat(5, 1fr)" h="full">
      <GridItem gridColumnStart="1" gridColumnEnd="3" h="full">
        <Map>
          {(data?.earthquakes || []).map((earthquake) => (
            <Marker
              top="-48px"
              key={earthquake.id.toString()}
              color={getMarkerColor(earthquake.strength)}
              coordinates={[earthquake.epicenterLng, earthquake.epicenterLat]}
            >
              <Text whiteSpace="nowrap">{earthquake.name}</Text>
              {Math.round(earthquake.strength * 100) / 100}
            </Marker>
          ))}
        </Map>
      </GridItem>

      <GridItem gridColumnStart="3" gridColumnEnd="5">
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
                  <Button
                    onClick={onDownloadEarthquakes}
                    colorScheme="facebook"
                  >
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
            strength: true,
            epicenterLng: true,
            epicenterLat: true,
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
      </GridItem>
    </Grid>
  );
};
