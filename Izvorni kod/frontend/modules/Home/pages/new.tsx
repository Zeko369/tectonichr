import React from "react";
import { NextPage } from "next";
import { z } from "zod";
import { Form, InputField } from "chakra-form";
import { useRouter } from "next/router";
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
    <Form schema={schema} onSubmit={onSubmit} submitText="create">
      <InputField name="email" />
      <InputField name="password" />
    </Form>
  );
};

export default HomePage;
