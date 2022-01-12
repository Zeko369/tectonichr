import { useApolloClient } from "@apollo/client";
import { useUNSTABLE_Alert } from "chakra-confirm";

import {
  ExportEarthquakesQuery,
  ExportEarthquakesQueryVariables,
} from "generated/graphql";
import { exportEarthquakes } from "../graphql/exportEarthquakes";
import { getExport } from "../utils/getExport";

export const useDownloadEarthquakes = () => {
  const client = useApolloClient();
  const alert = useUNSTABLE_Alert();

  return async () => {
    await getExport<ExportEarthquakesQuery, ExportEarthquakesQueryVariables>(
      client,
      alert,
      exportEarthquakes,
      "export.csv",
      "exportEarthquakes",
      {}
    );
  };
};
