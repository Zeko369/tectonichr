import React from "react";
import { NextPage } from "next";
import { z } from "zod";
import { Form, InputField } from "chakra-form";
import { useRouter } from "next/router";
import { VStack, Container } from "@chakra-ui/react";

import { useCreateUserMutation } from "../../../generated/graphql";

const schema = z.object({
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
      <Container>
        <Form schema={schema} onSubmit={onSubmit} submitText="Prijava">
          <InputField name="email" />
          <InputField name="lozinka" type="password" placeholder="Lozinka" />
        </Form>
      </Container>
    </VStack>
  );
};

export default HomePage;
