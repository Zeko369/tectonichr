import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Form } from "chakra-form";
import {
  Button,
  FormLabel,
  Heading,
  SimpleGrid,
  Spinner,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ConditionalWrap from "conditional-wrap";

import { useQuestionsQuery, useSubmitSurveyMutation } from "generated/graphql";
import { surveys } from "modules/Admin/Earthquakes/graphql/surveys";
import { RenderQuestion } from "../components/RenderQuestion";
import { getCoordinates } from "../utils/geo";
import { SearchCity } from "../components/SearchCity";

const SubmitSurveyPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast({ position: "top-right", isClosable: true });
  const [submit, { loading: isLoading }] = useSubmitSurveyMutation({
    refetchQueries: [{ query: surveys }],
  });

  const [state, setState] = useState<Record<string, string>>({});
  const [posLoading, setPosLoading] = useState(false);
  const [position, setPosition] =
    useState<{ latitude: number; longitude: number }>();

  const { data, loading, error } = useQuestionsQuery();
  useEffect(() => {
    if (!loading && !error && data) {
      setState(
        Object.fromEntries(data.questions.map((q) => [q.id, q.options[0].id]))
      );
    }
  }, [loading, error, data]);

  useEffect(() => {
    setPosLoading(true);
    getCoordinates()
      .then((coords) => {
        console.log(coords);

        if (coords) {
          setPosition(coords);
        }
      })
      .finally(() => setPosLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error || !data) {
    return <Heading>Error...</Heading>;
  }

  const isDisabled = Object.keys(state).length !== data.questions.length;
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDisabled) {
      return toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 3000,
      });
    }

    if (!position) {
      return toast({
        title: "Select a location",
        status: "error",
        duration: 3000,
      });
    }

    await submit({
      variables: {
        data: {
          lat: position.latitude,
          lng: position.longitude,
          responses: Object.entries(state).map(([questionId, optionId]) => ({
            questionId,
            optionId,
          })),
        },
      },
    });

    toast({ title: "Successfully submitted" });
    await router.push("/");
  };

  return (
    <VStack pt="5" maxW="80%" marginX="auto">
      <form onSubmit={onSubmit}>
        <VStack py="2" spacing="4">
          <Heading>Unesi novi potres</Heading>

          <SimpleGrid columns={[1, 2]} gap="12">
            <VStack align="flex-start">
              <Heading size="md">Lokacija</Heading>
              {posLoading ? (
                <Heading size="sm">Loading position...</Heading>
              ) : position ? (
                <Heading size="sm">Location set</Heading>
              ) : (
                <>
                  <Heading size="sm">
                    {"Couldn't load position from GPS, select a city bellow"}
                    <SearchCity
                      onChange={(c) =>
                        setPosition({
                          latitude: c.latitude,
                          longitude: c.longitude,
                        })
                      }
                    />
                  </Heading>
                </>
              )}
            </VStack>

            {data.questions.map((question) => (
              <RenderQuestion
                key={question.id}
                question={question}
                state={state}
                setState={setState}
              />
            ))}
          </SimpleGrid>

          <ConditionalWrap
            condition={isDisabled}
            wrap={(c) => (
              <Tooltip label="You need to check all of the values to be able to submit">
                {c}
              </Tooltip>
            )}
          >
            <Button isLoading={isLoading} type="submit">
              Send
            </Button>
          </ConditionalWrap>
        </VStack>
      </form>
    </VStack>
  );
};

export default SubmitSurveyPage;
