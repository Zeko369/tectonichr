import React from "react";
import { NextPage } from "next";
import { z } from "zod";
import { Form, InputField } from "chakra-form";
import { useRouter } from "next/router";
import { useCreateUserMutation } from "../../../generated/graphql";
import { Container } from "@chakra-ui/layout";
import Header from "modules/Partials/header";
import { VStack } from "@chakra-ui/react";

const schema = z.object({
  ime: z.string(),
  prezime: z.string(),
  email: z.string(),
  password: z.string(),
});

const HomePage: NextPage = () => {
  const router = useRouter();
  const [_, createUser] = useCreateUserMutation();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // @ts-ignore
    await createUser(data);
    await router.push("/");
  };

  return (
    <VStack>
      <Header />
      <Container>
          <Form schema={schema} onSubmit={onSubmit} submitText="Registriraj">
              <InputField name="ime" />
              <InputField name="prezime" />
              <InputField name="email" />
              <InputField name="lozinka" />
              <InputField name="potvrda lozinke" />
          </Form>
      </Container>
    </VStack>
    
  );
};

export default HomePage;