import React from "react";
import { NextPage } from "next";
import { useApolloClient } from "@apollo/client";
import { useUNSTABLE_Alert } from "chakra-confirm";
import { Button, Container, HStack, useBoolean, Text } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { DownloadIcon } from "@chakra-ui/icons";

import { exportEarthquakes } from "../graphql/exportEarthquakes";
import {
  ExportEarthquakeQuery,
  ExportEarthquakeQueryVariables,
  ExportEarthquakesQuery,
  ExportEarthquakesQueryVariables,
  ExportQuestionsQuery,
  ExportQuestionsQueryVariables,
  useEarthquakesQuery,
} from "../../../generated/graphql";
import { getExport } from "../utils/getExport";
import { exportEarthquake } from "../graphql/exportEarthquake";
import { exportQuestions } from "../graphql/exportQuestions";

const ExportDataPage: NextPage = () => {
  const client = useApolloClient();

  const [includeSurveys, { toggle }] = useBoolean();
  const { loading, error, data } = useEarthquakesQuery();

  const alert = useUNSTABLE_Alert();
  const onDownloadQuestions = async () => {
    await getExport<ExportQuestionsQuery, ExportQuestionsQueryVariables>(
      client,
      alert,
      exportQuestions,
      "questions.csv",
      "exportQuestions",
      {}
    );
  };

  const onDownloadEarthquakes = async () => {
    await getExport<ExportEarthquakesQuery, ExportEarthquakesQueryVariables>(
      client,
      alert,
      exportEarthquakes,
      "export.csv",
      "exportEarthquakes",
      {}
    );
  };

  const onDownloadEarthquake = (id: number) => async () => {
    await getExport<ExportEarthquakeQuery, ExportEarthquakeQueryVariables>(
      client,
      alert,
      exportEarthquake,
      `export-${id}.csv`,
      "exportEarthquake",
      {
        id,
        full: includeSurveys,
      }
    );
  };

  return (
    <Container maxW="80%">
      {error && <Text>Error...</Text>}

      <DataTable
        data={data?.earthquakes || []}
        title="Earthquakes"
        keys={["id", "name", "count", "date", "download"] as const}
        right={
          <HStack>
            <Button onClick={onDownloadQuestions}>Download questions</Button>
            <Button onClick={onDownloadEarthquakes}>Download all data</Button>
            <Button onClick={toggle}>
              {includeSurveys ? "Include" : "Exclude"} surveys
            </Button>
          </HStack>
        }
        mapper={{
          id: true,
          name: true,
          count: (r) => r.surveys.length.toString(),
          date: (r) => new Date(r.date).toLocaleString(),
          download: (r) => (
            <Button
              colorScheme="blue"
              leftIcon={<DownloadIcon />}
              onClick={onDownloadEarthquake(r.id)}
            >
              Download
            </Button>
          ),
        }}
      />
    </Container>
  );
};

export default ExportDataPage;
