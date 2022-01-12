import React from "react";
import { z } from "zod";
import { NextPage } from "next";
import { Form, FORM_ERROR, InputField } from "chakra-form";
import { Container, Heading, toast, useToast, VStack, Box, Button } from "@chakra-ui/react";
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
    <Box bg="#3939a4" minH="calc(100vh - 65px)" p="7%" opacity="0.9">
      <Container>
        <VStack border="4px" borderColor="#3934a4" borderRadius="20px" padding="10%" bgColor="white" minW="50%">
          <Heading>Promjena lozinke</Heading>

          <Form
            schema={schema}
            //submitText="Promijeni lozinku"
            submitButtonProps={{ isLoading: loading }}
            onSubmit={async (data) => {
              try {
                await changePassword({ variables: data });
                toast({ status: "success", title: "Lozinka promijenjena" });
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
            <InputField name="password" label="Lozinka"/>
            <b></b>
            <Button mt={4} colorScheme='teal' type='submit'>
              Promijeni lozinku
            </Button>
          </Form>
        </VStack>
      </Container>
    </Box>
    
  );
};

export default ChangePasswordPage;
