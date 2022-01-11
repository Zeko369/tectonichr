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
  Box
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
        title: "Označite sva polja",
        status: "error",
        duration: 3000,
      });
    }

    if (!position) {
      return toast({
        title: "Odaberite lokaciju",
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

    toast({ title: "Uspješno predano" });
    await router.push("/");
  };

  return (
    <Box bg="#3939a4" minH="calc(100vh - 65px)" p="5%" paddingTop="1%" opacity="0.9">
      <VStack pt="5" maxW="80%" marginX="auto" border="4px" borderColor="#3934a4" borderRadius="20px" padding="5%" bgColor="white">
        <form onSubmit={onSubmit}>
          <VStack py="2" spacing="4" marginBottom="30px">
            <Heading marginBottom="5%">Unesi novi potres</Heading>

            <SimpleGrid columns={[1, 2]} gap="12">
              <VStack align="flex-start" marginBottom="30%">
                <Heading size="md">Lokacija</Heading>
                {posLoading ? (
                  <Heading size="sm">Učitavanje lokacije...</Heading>
                ) : position ? (
                  <Heading size="sm">Lokacija postavljena</Heading>
                ) : (
                  <>
                    <Heading size="sm" p="2%">
                      {"Nije moguće dohvatiti lokaciju. Odaberite neki od ponuđenih gradova."}
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
                <Tooltip label="Odgovorite na sva pitanja kako bi mogli predati upitnik">
                  {c}
                </Tooltip>
              )}
            >
              <Button isLoading={isLoading} type="submit" colorScheme="teal"> 
                Predaj
              </Button>
            </ConditionalWrap>
          </VStack>
        </form>
      </VStack>
    </Box>
    
  );
};

export default SubmitSurveyPage;
