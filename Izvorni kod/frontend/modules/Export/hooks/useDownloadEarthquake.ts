import { useApolloClient } from "@apollo/client";
import { useUNSTABLE_Alert } from "chakra-confirm";

import {
  ExportEarthquakeQuery,
  ExportEarthquakeQueryVariables,
} from "generated/graphql";
import { exportEarthquake } from "../graphql/exportEarthquake";
import { getExport } from "../utils/getExport";

export const useDownloadEarthquake = (includeSurveys: boolean) => {
  const client = useApolloClient();
  const alert = useUNSTABLE_Alert();

  return (id: number) => async () => {
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
};
