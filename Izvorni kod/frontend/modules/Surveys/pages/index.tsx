import React from "react";
import { NextPage } from "next";
import { useSubmitSurveyMutation } from "generated/graphql";
import { Form } from "chakra-form";
import { Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { z } from "zod";
import { surveys } from "modules/Admin/Earthquakes/graphql/surveys";

const schema = z.object({});

const SubmitSurveyPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [submit, { loading }] = useSubmitSurveyMutation({
    refetchQueries: [{ query: surveys }],
  });

  return (
    <Form
      schema={schema}
      submitText="Pošalji"
      submitButtonProps={{ isLoading: loading }}
      onSubmit={async (data) => {
        await submit({});
        toast({ title: "Successfully submitted" });
        await router.push("/");
      }}
    >
      <Heading>todo add fields for questions</Heading>
    </Form>
  );
};

export default SubmitSurveyPage;
