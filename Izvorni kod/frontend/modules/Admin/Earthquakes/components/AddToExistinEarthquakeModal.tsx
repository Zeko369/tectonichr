import React from "react";
import { UseDisclosureReturn } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, Heading } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";

import {
  useEarthquakesQuery,
  useUpdateEarthquakeMutation,
} from "../../../../generated/graphql";
import { surveys } from "../graphql/surveys";
import { earthquakes } from "../graphql/earthquakes";

type Props = {
  modalProps: Omit<UseDisclosureReturn, "onClose"> & {
    onClose: (done?: boolean) => void;
  };
  surveyIds: number[];
};

export const AddToExistingEarthquakeModal: React.FC<Props> = (props) => {
  const { modalProps, surveyIds } = props;
  const { data, loading, error } = useEarthquakesQuery();

  const [updateEarthquake] = useUpdateEarthquakeMutation({
    refetchQueries: [{ query: surveys }, { query: earthquakes }],
  });
  const onAdd = (id: number) => async () => {
    await updateEarthquake({ variables: { id, add: surveyIds } });
    modalProps.onClose(true);
  };

  return (
    <Modal {...modalProps} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <ModalHeader>Dodaj u neki aktualni potres</ModalHeader>
          <ModalCloseButton />

          {error && <Heading>Pogreška pri učitavanju...</Heading>}

          <DataTable
            keys={["id", "name", "date", "select"] as const}
            isLoading={loading}
            data={data?.earthquakes || []}
            mapper={{
              id: true,
              name: true,
              date: (row) => new Date(row.date).toLocaleString(),
              select: (row) => (
                <Button colorScheme="teal" onClick={onAdd(row.id)}>
                  Dodaj
                </Button>
              ),
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={() => modalProps.onClose()}>Zatvori</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};