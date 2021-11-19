import React, { useState } from "react";
import { NextPage } from "next";
import {
  Button,
  Heading,
  HStack,
  Spinner,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { LinkButton } from "chakra-next-link";
import { useConfirmDelete } from "chakra-confirm";
import ConditionalWrap from "conditional-wrap";

import {
  useDeleteUserMutation,
  useMeQuery,
  useUsersQuery,
} from "generated/graphql";
import { getUsers } from "../graphql/getUsers";

const UsersPage: NextPage = () => {
  const { data: me } = useMeQuery();
  const { loading, error, data } = useUsersQuery();
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const [deleteUser] = useDeleteUserMutation({
    refetchQueries: [{ query: getUsers }],
  });
  const confirmDelete = useConfirmDelete();
  const onDelete = (id: number) => async () => {
    if (await confirmDelete()) {
      try {
        setDeletingIds((ids) => [...ids, id]);
        await deleteUser({ variables: { id } });
      } finally {
        setDeletingIds((ids) => ids.filter((i) => i !== id));
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error || !data) {
    return <Heading>Error</Heading>;
  }

  return (
    <VStack pt="5" maxW="80%" marginX="auto">
      <DataTable
        data={data.users}
        right={
          <LinkButton href="/admin/users/new" colorScheme="blue">
            New user
          </LinkButton>
        }
        keys={["id", "email", "role", "ops"] as const}
        mapper={{
          id: true,
          email: true,
          role: true,
          ops: (user) => (
            <HStack>
              <ConditionalWrap
                condition={me?.me?.id === user.id}
                wrap={(c) => (
                  <Tooltip label="You can't delete yourself" shouldWrapChildren>
                    {c}
                  </Tooltip>
                )}
              >
                <Button
                  onClick={onDelete(user.id)}
                  colorScheme="red"
                  isDisabled={me?.me?.id === user.id}
                  isLoading={deletingIds.includes(user.id)}
                >
                  Delete
                </Button>
              </ConditionalWrap>
            </HStack>
          ),
        }}
      />
    </VStack>
  );
};

export default UsersPage;
