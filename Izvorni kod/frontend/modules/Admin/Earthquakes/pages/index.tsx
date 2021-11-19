import React, { useState } from "react";
import { NextPage } from "next";
import { Button, Spinner, Container, VStack, Checkbox } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { usePrompt } from "chakra-confirm";

import {
  useEarthquakesQuery,
  useMergeSurveysMutation,
  useSurveysQuery,
} from "generated/graphql";
import { surveys } from "../graphql/surveys";
import { earthquakes } from "../graphql/earthquakes";

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
          // @ts-ignore
          surveyIds: selectedIds,
        },
      });
      await refetch();
      setSelectedIds([]);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <DataTable
      isLoading={merging}
      title="Unmerged surveys"
      data={data?.surveys || []}
      keyFunc={(r) => r.id.toString()}
      right={selectedIds.length > 0 && <Button onClick={onMerge}>Merge</Button>}
      keys={["select", "id", "date"] as const}
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
      }}
    />
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
