import { ApolloClient, DocumentNode } from "@apollo/client";
import { downloadFile } from "./downloadAsFile";

export const getExport = async <Q extends {}, T = undefined>(
  client: ApolloClient<any>,
  alert: any,
  query: DocumentNode,
  filename: string,
  path: keyof Q,
  variables: T
): Promise<void> => {
  const res = await client.query<Q, T>({
    query: query,
    fetchPolicy: "network-only",
    variables,
  });

  if (res.error || !res.data) {
    return alert({
      title: "Error",
      body: "An error occurred loading data",
    });
  }

  downloadFile(filename, (res.data?.[path] as unknown as string) || "error");
};
