import React from "react";
import { z } from "zod";
import { NextPage } from "next";
import { Form, FORM_ERROR, InputField } from "chakra-form";
import { Container, Heading, useToast, VStack } from "@chakra-ui/react";
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";

import { useChangePasswordMutation } from "generated/graphql";

const schema = z.object({
  password: z.string().min(6),
});

const ChangePasswordPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [changePassword, { loading }] = useChangePasswordMutation();

  return (
    <Container>
      <VStack>
        <Heading>Promjena lozinke</Heading>

        <Form
          schema={schema}
          submitText="Promijeni lozinku"
          submitButtonProps={{ isLoading: loading }}
          onSubmit={async (data) => {
            try {
              await changePassword({ variables: data });
              toast({ status: "success", title: "Password changed" });
              await router.push("/");
            } catch (err) {
              if (err instanceof ApolloError) {
                return {
                  [FORM_ERROR]: err.message,
                };
              }

              throw err;
            }
          }}
        >
          <InputField name="password" />
        </Form>
      </VStack>
    </Container>
  );
};

export default ChangePasswordPage;
