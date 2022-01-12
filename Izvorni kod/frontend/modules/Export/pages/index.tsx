import React from "react";
import { NextPage } from "next";
import { useApolloClient } from "@apollo/client";
import { useUNSTABLE_Alert } from "chakra-confirm";
import { Button, Container, HStack, useBoolean, Text, Box } from "@chakra-ui/react";
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
    <Box bg="#3939a4" minH="calc(100vh - 65px)" p="5%" opacity="0.9">
      <Container maxW="80%" marginX="auto" border="4px" borderColor="#3939a4" borderRadius="20px" padding="4%" bgColor="white">
        {error && <Text>Error...</Text>}

        <DataTable
          data={data?.earthquakes || []}
          title="Potresi"
          keys={["id", "name", "count", "date", "download"] as const}
          labels={{id: "id", name: "Naziv", count: "Broj upitnika", date: "Datum i vrijeme", download: " "}}
          right={
            <HStack pb="2%">
              <Button onClick={onDownloadQuestions} bgColor="#3939a4" textColor="white">Preuzmi pitanja upitnika</Button>
              <Button onClick={onDownloadEarthquakes} bgColor="#3939a4" textColor="white">Preuzmi sve potrese</Button>
              <Button onClick={toggle}>
                {includeSurveys ? "Preuzmi i " : "Izuzmi"} upitnike
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
                colorScheme="teal"
                leftIcon={<DownloadIcon />}
                onClick={onDownloadEarthquake(r.id)}
              >
                Preuzmi
              </Button>
            ),
          }}
        />
      </Container>
    </Box>
    
  );
};

export default ExportDataPage;
