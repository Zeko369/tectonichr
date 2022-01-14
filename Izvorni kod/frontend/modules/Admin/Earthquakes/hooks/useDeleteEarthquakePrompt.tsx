import React, { useEffect } from "react";
import { VStack, Text, Heading } from "@chakra-ui/react";
import { usePrompt } from "chakra-confirm";
import { Checkbox, CheckboxField, Input } from "chakra-form";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  defaultName: z.string(),
  removeSurveys: z.boolean(),
});

type PromptBodyProps = {
  state: z.infer<typeof schema>;
  setState: React.Dispatch<React.SetStateAction<z.infer<typeof schema>>>;
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const PromptBody: React.FC<PromptBodyProps> = (props) => {
  const { state, setState, setIsFormValid } = props;

  const parsed = schema.safeParse(state);
  useEffect(() => {
    setIsFormValid(
      parsed.success && parsed.data.name === parsed.data.defaultName
    );
  }, [parsed, setIsFormValid]);

  return (
    <VStack align="flex-start">
      <Heading size="sm">Za potvrđivanje brisanja upišite ime potresa</Heading>
      <Input
        isRequired
        label="Ime potresa"
        placeholder={state.defaultName}
        error={
          parsed.success
            ? undefined
            : parsed.error.format().name?._errors.join(", ")
        }
        onChange={(e) => setState((v) => ({ ...v, name: e.target.value }))}
        value={state.name}
      />

      <Checkbox
        isChecked={state.removeSurveys}
        name="Obriši pridružene upitnike"
        onChange={(e) =>
          setState((v) => ({ ...v, removeSurveys: e.target.checked }))
        }
      />
    </VStack>
  );
};

export const useDeleteEarthquakePrompt = () => {
  return usePrompt<z.infer<typeof schema>>({
    customBody: PromptBody,
  });
};