import React, { useState } from "react";
import { NextPage } from "next";
import {
  Button,
  Spinner,
  Container,
  VStack,
  Checkbox,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { useConfirmDelete, usePrompt } from "chakra-confirm";

import {
  useDeleteSurveyMutation,
  useEarthquakesQuery,
  useMergeSurveysMutation,
  useSurveysQuery,
} from "generated/graphql";
import { surveys } from "../graphql/surveys";
import { earthquakes } from "../graphql/earthquakes";
import { AddToExistingEarthquakeModal } from "../components/AddToExistinEarthquakeModal";

const UnmergedSurveys: React.FC = () => {
  const { loading, error, data, refetch } = useSurveysQuery();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [merge, { loading: merging }] = useMergeSurveysMutation({
    refetchQueries: [{ query: surveys }, { query: earthquakes }],
  });

  const prompt = usePrompt();
  const onMerge = async () => {
    const name = await prompt({ title: "Earthquake name" });
    if (name) {
      await merge({
        variables: {
          name,
          surveyIds: selectedIds,
        },
      });
      await refetch();
      setSelectedIds([]);
    }
  };

  const addToExistingModal = useDisclosure();
  const onAddToEarthquake = () => {
    addToExistingModal.onOpen();
  };

  const onClose = () => {
    addToExistingModal.onClose();
    setSelectedIds([]);
  };

  const [deleteSurvey] = useDeleteSurveyMutation({
    refetchQueries: [{ query: surveys }],
  });

  const confirmDelete = useConfirmDelete();
  const onDelete = (id: number) => async () => {
    if (await confirmDelete()) {
      await deleteSurvey({ variables: { id } });
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <>
      <AddToExistingEarthquakeModal
        modalProps={{ ...addToExistingModal, onClose }}
        surveyIds={selectedIds}
      />
      <DataTable
        isLoading={merging}
        title="Unmerged surveys"
        data={data?.surveys || []}
        keyFunc={(r) => r.id.toString()}
        right={
          selectedIds.length > 0 && (
            <HStack>
              <Button onClick={onMerge}>New</Button>
              <Button onClick={onAddToEarthquake}>Existing</Button>
            </HStack>
          )
        }
        keys={["select", "id", "date", "actions"] as const}
        mapper={{
          select: (r) => (
            <Checkbox
              checked={selectedIds.includes(r.id)}
              onChange={(e) =>
                setSelectedIds((ids) =>
                  ids.includes(r.id)
                    ? ids.filter((id) => id !== r.id)
                    : [...ids, r.id]
                )
              }
            />
          ),
          id: true,
          date: (r) => new Date(r.createdAt).toLocaleString(),
          actions: (r) => (
            <Button size="sm" colorScheme="red" onClick={onDelete(r.id)}>
              Delete
            </Button>
          ),
        }}
      />
    </>
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
        date: (r) => new Date(r.date).toLocaleString(),
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
