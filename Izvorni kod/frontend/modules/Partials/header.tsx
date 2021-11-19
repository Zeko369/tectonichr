import React from "react";
import { NextPage } from "next";
import {
  Heading,
  VStack,
  Container,
  Flex,
  Box,
  Center,
  Spacer,
  Image,
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  Link
} from "@chakra-ui/react";

const HomePage: NextPage = () => {  
    return (
        <Container maxWidth="100%" p={0} bg="#a0afdb">
            <Flex> 
            <Center>
                <Heading size="md" p="2">TectonicHr</Heading>
            </Center>
            <Spacer />
            <Box>
                <Menu>
                <MenuButton as={IconButton} aria-label="Izbornik za registraciju i prijavu" icon={<Image src="/izbornik.png" alt="Izbornik za registraciju i prijavu" boxSize="40px" m={2}></Image>} variant="outline" m={1}/>
                <MenuList>
                    <Link href="/registracija"><MenuItem>Registracija</MenuItem></Link>
                    <Link href="/prijava"><MenuItem>Prijava</MenuItem></Link>
                </MenuList>
                </Menu>
            </Box>
            </Flex>
        </Container>
    );
  };
  
  export default HomePage;