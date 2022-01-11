import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { SurveysQuery } from "generated/graphql";
import { DataTable } from "chakra-data-table";

type PreviewModalProps = {
  previewSurvey: SurveysQuery["surveys"][number] | undefined;
  modalProps: UseDisclosureReturn;
};

export const PreviewSurveyModal: React.FC<PreviewModalProps> = (props) => {
  const { modalProps, previewSurvey } = props;

  return (
    <Modal {...modalProps} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <ModalHeader>Pregled upitnika</ModalHeader>
          <ModalCloseButton />

          {previewSurvey && (
            <DataTable
              data={previewSurvey.responses}
              keys={["question", "ans", "intensity"] as const}
              mapper={{
                question: true,
                ans: (r) => `${r.optionLetter}) ${r.option}`,
                intensity: true,
              }}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};