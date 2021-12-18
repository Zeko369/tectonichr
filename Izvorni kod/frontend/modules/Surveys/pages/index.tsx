import React from "react";
import { NextPage } from "next";
import { useSubmitSurveyMutation } from "generated/graphql";
import { Form } from "chakra-form";
import { Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { z } from "zod";
import { surveys } from "modules/Admin/Earthquakes/graphql/surveys";
import { Select } from "@chakra-ui/react";
import { FirstQuestion } from "../../../../shared/enums/SurveyEnums";

const Questions: React.FC = () => {
  let firstQuestionOptions: String[] = [];

  const keysOne = Object.keys(FirstQuestion);
  keysOne.forEach(enumKey => {
    firstQuestionOptions.push(
      `<option value="${enumKey}">${enumKey}</option>`
    );
  })

  return (
    <Select placeholder="U zatvorenom prostoru potres su osjetili:">
      {firstQuestionOptions}
    </Select>
  );
};

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
      <Questions/>
    </Form>
  );
};

export default SubmitSurveyPage;
