import React from "react";
import { NextPage } from "next";
import { z } from "zod";
import { Form, InputField } from "chakra-form";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/layout";
import { VStack, Input, InputGroup } from "@chakra-ui/react";

const schema = z.object({
  ime: z.string(),
  prezime: z.string(),
  email: z.string(),
  password: z.string(),
});

const HomePage: NextPage = () => {
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof schema>) => {
    // @ts-ignore
    console.log(data);
    // await createUser(data);
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
