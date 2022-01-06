import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useMeQuery, UserRole } from "generated/graphql";
import { Link } from "chakra-next-link";
import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Navigation: React.FC = () => {
  const router = useRouter();
  const { loading, data, client, error, refetch } = useMeQuery();

  useEffect(() => {
    if (
      error &&
      error.message === "Response not successful: Received status code 401" &&
      localStorage.getItem("token")
    ) {
      localStorage.removeItem("token");
    }
  }, [error]);

  const onLogout = async () => {
    if (router.pathname !== "/") {
      await router.push("/");
    }

    localStorage.removeItem("token");

    await refetch();
    await client.resetStore();
  };

  const loggedIn = !!data?.me?.id;

  return (
    <Container maxWidth="100%" p={0} bg="#a0afdb">
      <Flex px="2" py="2">
        <Center>
          <Link href="/">
            <Heading size="md" p="2">
              TectonicHr
            </Heading>
          </Link>
        </Center>

        <Spacer />

        <Box>
          {loading ? (
            <Spinner />
          ) : (
            <Menu>
              <MenuButton
                as={!loggedIn ? IconButton : undefined}
                aria-label="Izbornik za registraciju i prijavu"
                icon={!loggedIn && <HamburgerIcon />}
                variant={!loggedIn ? "outline" : undefined}
                m={1}
              >
                {data?.me ? <Avatar name={data.me.email} /> : null}
              </MenuButton>
              <MenuList>
                {data?.me ? (
                  <>
                    {data.me.role === UserRole.Admin && (
                      <>
                        <Link href="/admin/users">
                          <MenuItem>Sezimolozi</MenuItem>
                        </Link>
                        <Link href="/admin/earthquakes">
                          <MenuItem>Potresi</MenuItem>
                        </Link>
                      </>
                    )}
                    {[UserRole.Seismologists, UserRole.Admin].includes(
                      data.me.role
                    ) && (
                      <>
                        <Link href="/export">
                          <MenuItem>Izvoz podataka</MenuItem>
                        </Link>
                      </>
                    )}

                    <MenuDivider />

                    <MenuItem onClick={onLogout}>Odjava</MenuItem>
                  </>
                ) : (
                  <Link href="/auth/login">
                    <MenuItem>Prijava</MenuItem>
                  </Link>
                )}
              </MenuList>
            </Menu>
          )}
        </Box>
      </Flex>
    </Container>
  );
};
