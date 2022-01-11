import React from "react";
import { NextPage } from "next";
import { z } from "zod";
import { Form, FORM_ERROR, InputField } from "chakra-form";
import { useRouter } from "next/router";
import { VStack, Container, Heading, Box, Button } from "@chakra-ui/react";
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
    <Box bg="#3939a4" minH="calc(100vh - 65px)" p="5%" opacity="0.9" >
      <Container border="4px" borderColor="#3934a4" borderRadius="20px" padding="5%" bgColor="white" minW="60%">
        <VStack>
          <Heading>Kreiraj novog seizmologa</Heading>

          <Form
            schema={schema}
            onSubmit={onSubmit}
            //submitText="Kreiraj"
            submitButtonProps={{ isLoading: loading }}
          >
            <InputField name="email" />
            <InputField name="password" />
            <b></b>
            <Button mt={4} colorScheme='teal' type='submit'>
                Kreiraj
            </Button>
          </Form>
        </VStack>
      </Container>
    </Box>
    
  );
};

export default NewUserPage;