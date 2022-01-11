import React from "react";
import { NextPage } from "next";
import { z } from "zod";
import { Form, FORM_ERROR, InputField } from "chakra-form";
import { useRouter } from "next/router";
import { VStack, Container, Heading } from "@chakra-ui/react";
import { ApolloError } from "@apollo/client";

import { useCreateUserMutation } from "generated/graphql";
import { getUsers } from "../graphql/getUsers";

const schema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

const NewUserPage: NextPage = () => {
  const router = useRouter();
  const [createUser, { loading }] = useCreateUserMutation({
    refetchQueries: [{ query: getUsers }],
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await createUser({ variables: data });
      await router.push("/admin/users");
    } catch (err) {
      if (err instanceof ApolloError) {
        if (err.message === "EMAIL_IN_USE") {
          return { email: "Email in use" };
        }

        return { [FORM_ERROR]: err.message };
      }

      throw err;
    }
  };

  return (
    <Container>
      <VStack>
        <Heading>Kreiraj novog seizmologa</Heading>

        <Form
          schema={schema}
          onSubmit={onSubmit}
          submitText="Kreiraj"
          submitButtonProps={{ isLoading: loading }}
        >
          <InputField name="email" />
          <InputField name="password" />
        </Form>
      </VStack>
    </Container>
  );
};

export default NewUserPage;
