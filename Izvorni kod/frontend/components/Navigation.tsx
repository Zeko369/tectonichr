import React, { useEffect } from "react";
import {
  Avatar,
  AvatarBadge,
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
    <Container maxWidth="100%" p={0} bg="#3939a4e6">
      <Flex px="2" py="2">
        <Center>
          <Link href="/">
            <Heading size="lg" p="2" color="white">
              TECTONIC HR
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
                bgColor="white"
              >
                {data?.me ? (
                  <Avatar
                    name={data.me.email}
                    bgColor="white"
                    textColor="#3939a4"
                    border="10px"
                    borderRadius="50px"
                    borderColor="#3939a4"
                  >
                    {!data.me.changedPassword && (
                      <AvatarBadge
                        boxSize="1.25em"
                        borderColor="papayawhip"
                        bg="tomato"
                      />
                    )}
                  </Avatar>
                ) : null}
              </MenuButton>
              <MenuList>
                {data?.me ? (
                  <>
                    <Link href="/auth/change-password">
                      <MenuItem
                        fontWeight={
                          data.me.changedPassword ? undefined : "bold"
                        }
                      >
                        Promijeni lozinku
                      </MenuItem>
                    </Link>
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
