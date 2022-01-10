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
        title: `Delete earthquake "${earthquake.name}"`,
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
      title="Earthquakes"
      keys={["id", "name", "count", "date", "archived", "actions"] as const}
      mapper={{
        id: true,
        name: true,
        count: (r) => r.surveys.length.toString(),
        date: (r) => new Date(r.date).toLocaleString(),
        archived: (r) =>
          r.archivedAt && new Date(r.archivedAt).toLocaleString(),
        actions: (r) => (
          <HStack>
            {!r.archivedAt && (
              <Button size="sm" colorScheme="yellow" onClick={onArchive(r.id)}>
                Archive
              </Button>
            )}
            <Button size="sm" colorScheme="red" onClick={onDelete(r)}>
              Delete
            </Button>
          </HStack>
        ),
      }}
    />
  );
};
