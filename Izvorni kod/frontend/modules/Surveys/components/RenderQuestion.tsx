import React from "react";
import { QuestionsQuery } from "generated/graphql";
import { Heading, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";

type RenderQuestionProps = {
  question: QuestionsQuery["questions"][number];
  state: Record<string, string>;
  setState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const RenderQuestion: React.FC<RenderQuestionProps> = (props) => {
  const { question, state, setState } = props;

  return (
    <VStack align="flex-start">
      <Heading size="md">{question.text}</Heading>

      <RadioGroup
        value={state[question.id]}
        onChange={(val) => setState((obj) => ({ ...obj, [question.id]: val }))}
        isRequired
      >
        <Stack>
          {question.options.map((option) => (
            <Radio key={option.id} value={option.id}>
              {option.text}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </VStack>
  );
};
