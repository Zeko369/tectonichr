import React from "react";
import { NextPage } from "next";
import { useApolloClient } from "@apollo/client";
import { useUNSTABLE_Alert } from "chakra-confirm";
import { Button } from "@chakra-ui/react";

import { exportEarthquakes } from "../graphql/exportEarthquakes";
import { ExportEarthquakesQuery } from "../../../generated/graphql";
import { downloadFile } from "../utils/download";

const ExportDataPage: NextPage = () => {
  const client = useApolloClient();

  const alert = useUNSTABLE_Alert();
  const onDownload = async () => {
    const res = await client.query<ExportEarthquakesQuery>({
      query: exportEarthquakes,
      fetchPolicy: "network-only",
    });
    if (res.error || !res.data) {
      return alert({
        title: "Error",
        body: "An error occurred loading earthquakes",
      });
    }

    downloadFile("export.csv", res.data.exportEarthquakes);
  };

  return <Button onClick={onDownload}>Download all data</Button>;
};

export default ExportDataPage;
