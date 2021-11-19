import React from "react";
import { NextPage } from "next";
import { z } from "zod";
import { Form, InputField } from "chakra-form";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";

const schema = z.object({
  ime: z.string(),
  prezime: z.string(),
  email: z.string(),
  password: z.string(),
});

const HomePage: NextPage = () => {
  const router = useRouter();
  // const [_, createUser] = useCreateUserMutation();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // @ts-ignore
    // await createUser(data);
    await router.push("/");
  };

  return (
    <VStack>
      <Container>
        <Form schema={schema} onSubmit={onSubmit} submitText="Registriraj">
          <InputField name="ime" />
          <InputField name="prezime" />
          <InputField name="email" />
          <InputField name="lozinka" type="password" />
          <InputField name="potvrda lozinke" type="password" />
        </Form>
      </Container>
    </VStack>
  );
};

export default HomePage;
