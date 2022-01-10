import React, { useState } from "react";
import {
  useDisclosure,
  Spinner,
  HStack,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { usePrompt, useConfirmDelete } from "chakra-confirm";
import { DataTable } from "chakra-data-table";

import {
  useSurveysQuery,
  useMergeSurveysMutation,
  useDeleteSurveyMutation,
} from "generated/graphql";
import { earthquakes } from "../graphql/earthquakes";
import { surveys } from "../graphql/surveys";
import { AddToExistingEarthquakeModal } from "./AddToExistinEarthquakeModal";
import { PreviewSurveyModal } from "./PreviewSurveyModal";

export const UnmergedSurveys: React.FC = () => {
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

  const previewModal = useDisclosure();
  const [previewId, setPreviewId] = useState<number>();
  const onPreview = (id: number) => () => {
    setPreviewId(id);
    previewModal.onOpen();
  };

  const previewSurvey = data?.surveys.find((s) => s.id === previewId);

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <>
      <AddToExistingEarthquakeModal
        modalProps={{ ...addToExistingModal, onClose }}
        surveyIds={selectedIds}
      />

      <PreviewSurveyModal
        previewSurvey={previewSurvey}
        modalProps={{
          ...previewModal,
          onClose: () => {
            setPreviewId(undefined);
            previewModal.onClose();
          },
        }}
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
            <HStack>
              <Button size="sm" colorScheme="red" onClick={onDelete(r.id)}>
                Delete
              </Button>
              <Button size="sm" colorScheme="blue" onClick={onPreview(r.id)}>
                Preview
              </Button>
            </HStack>
          ),
        }}
      />
    </>
  );
};
