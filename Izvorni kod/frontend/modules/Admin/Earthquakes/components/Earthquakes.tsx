import React from "react";
import { useConfirm } from "chakra-confirm";
import { Button, HStack, Spinner } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";

import {
  EarthquakesQuery,
  useArchiveEarthquakeMutation,
  useDeleteEarthquakeMutation,
  useEarthquakesQuery,
} from "../../../../generated/graphql";
import { useDeleteEarthquakePrompt } from "../hooks/useDeleteEarthquakePrompt";
import { surveys } from "../graphql/surveys";
import { earthquakes } from "../graphql/earthquakes";

export const refetchEarthquakes = [{ query: earthquakes }];
export const refetchEarthquakesAndSurveys = [
  { query: surveys },
  { query: earthquakes },
];

export const Earthquakes: React.FC = () => {
  const { loading, error, data } = useEarthquakesQuery();

  const confirm = useConfirm();

  const [archiveEarthquake] = useArchiveEarthquakeMutation({
    refetchQueries: refetchEarthquakes,
  });

  const onArchive = (id: number) => async () => {
    if (await confirm()) {
      await archiveEarthquake({ variables: { id } });
    }
  };

  const [deleteEarthquake] = useDeleteEarthquakeMutation({
    refetchQueries: refetchEarthquakesAndSurveys,
  });
  const deletePrompt = useDeleteEarthquakePrompt();
  const onDelete =
    (earthquake: EarthquakesQuery["earthquakes"][number]) => async () => {
      const res = await deletePrompt({
        title: `Obriši potres "${earthquake.name}"`,
        defaultState: {
          name: "",
          defaultName: earthquake.name,
          removeSurveys: true,
        },
      });

      if (res !== null) {
        await deleteEarthquake({
          variables: {
            id: earthquake.id,
            removeSurveys: res.removeSurveys,
          },
        });
      }
    };

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <DataTable
      data={data?.earthquakes || []}
      title="Potresi"
      keys={
        [
          "id",
          "name",
          "count",
          "strength",
          "date",
          "archived",
          "actions",
        ] as const
      }
      labels={{
        name: "Ime",
        count: "Broj upitnika",
        strength: "Jačina",
        date: "Datum",
        archived: "Arhivirano",
        actions: " ",
      }}
      mapper={{
        id: true,
        name: true,
        count: (r) => r.surveys.length.toString(),
        strength: true,
        date: (r) => new Date(r.date).toLocaleString(),
        archived: (r) =>
          r.archivedAt && new Date(r.archivedAt).toLocaleString(),
        actions: (r) => (
          <HStack>
            {!r.archivedAt && (
              <Button size="sm" colorScheme="teal" onClick={onArchive(r.id)}>
                Arhiviraj
              </Button>
            )}
            <Button size="sm" colorScheme="red" onClick={onDelete(r)}>
              Obriši
            </Button>
          </HStack>
        ),
      }}
    />
  );
};
