import React, { useEffect } from "react";
import { z } from "zod";
import { NextPage } from "next";
import { Form, FORM_ERROR, InputField } from "chakra-form";
import { useRouter } from "next/router";
import { VStack, Container, Heading, Button, Box } from "@chakra-ui/react";
import { ApolloError } from "@apollo/client";
import { useLoginMutation, useMeQuery } from "generated/graphql";

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
  }, [meLoading, data, router]);

  return (
    <Box bg="#3939a4" minH="calc(100vh - 65px)" p="5%" opacity="0.9">
      <Container>
        <Container
          border="4px"
          borderColor="#3934a4"
          borderRadius="20px"
          padding="10%"
          bgColor="white"
        >
          <VStack>
            <Heading>Prijava</Heading>

            <Form
              schema={schema}
              //submitText="Prijavi se"
              //submitButtonProps={{ isLoading: loading }}

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
                      return { password: "Neipravna lozinka" };
                    }

                    if (err.message === "EMAIL_NOT_FOUND") {
                      return { email: "Neispravan email" };
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
              <InputField name="password" label="Lozinka"/>
              <b></b>
              <Button mt={4} colorScheme="teal" type="submit">
                Prijavi se
              </Button>
            </Form>
          </VStack>
        </Container>
      </Container>
    </Box>
  );
};

export default LoginPage;
