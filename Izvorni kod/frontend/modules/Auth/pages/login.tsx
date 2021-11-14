import React, { useEffect } from "react";
import { z } from "zod";
import { NextPage } from "next";
import { Form, FORM_ERROR, InputField } from "chakra-form";
import { useRouter } from "next/router";

import { useLoginMutation, useMeQuery } from "generated/graphql";
import { VStack, Container, Heading } from "@chakra-ui/react";
import { ApolloError } from "@apollo/client";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [login, { loading, client }] = useLoginMutation();
  const { data, loading: meLoading, refetch } = useMeQuery();

  useEffect(() => {
    if (data?.me?.id) {
      router.push("/");
    }
  }, [meLoading, data]);

  return (
    <Container>
      <VStack>
        <Heading>Prijava</Heading>

        <Form
          schema={schema}
          submitText="login"
          submitButtonProps={{ isLoading: loading }}
          onSubmit={async (data) => {
            try {
              const res = await login({ variables: data });
              const token = res.data?.login.token!;
              localStorage.setItem("token", token);

              await client.refetchQueries({});
              // await router.push("/");
              // TODO: Fix
              window.location.href = "/";
            } catch (err) {
              if (err instanceof ApolloError) {
                if (err.message === "WRONG_PASSWORD") {
                  return { password: "Wrong password" };
                }

                if (err.message === "EMAIL_NOT_FOUND") {
                  return { email: "Email not found" };
                }

                return {
                  [FORM_ERROR]: err.message,
                };
              }

              throw err;
            }
          }}
        >
          <InputField name="email" />
          <InputField name="password" />
        </Form>
      </VStack>
    </Container>
  );
};

export default LoginPage;
