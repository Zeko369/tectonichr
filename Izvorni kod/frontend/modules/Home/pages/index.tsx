import React from "react";
import { NextPage } from "next";
import { LinkButton } from "chakra-next-link";
import {
  Container,
  Flex,
  Image,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { useEarthquakesQuery } from "../../../generated/graphql";

type EarthquakesProps = {
  archived: boolean;
  title: string;
  empty: string;
};

export const Earthquakes: React.FC<EarthquakesProps> = (props) => {
  const { archived, title, empty } = props;
  const { loading, error, data } = useEarthquakesQuery({
    variables: { archived },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <DataTable
      data={data?.earthquakes || []}
      title={title}
      emptyText={empty}
      keys={["id", "name", "count", "date"] as const}
      mapper={{
        id: true,
        name: true,
        count: (r) => r.surveys.length.toString(),
        date: (r) => new Date(r.date).toLocaleString(),
      }}
    />
  );
};

const HomePage: NextPage = () => {
  return (
    <VStack>
      <Container maxWidth="100%" p={10}>
        <Flex alignContent="center">
          <VStack width="50%" height="50%" alignItems="center">
            <Image src="/primjer-karte.jpg" alt="Primjer karte potresa"></Image>
          </VStack>
          <VStack width="50%" height="50%" alignItems="center">
            <LinkButton href="/surveys/new" size="lg">
              Novi potres?
            </LinkButton>

            <Tabs w="full">
              <TabList>
                <Tab>Aktualni</Tab>
                <Tab>Arhivirani</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Earthquakes
                    title="Aktualni potresi"
                    empty="Nema aktualnih potresa"
                    archived={false}
                  />
                </TabPanel>
                <TabPanel>
                  <Earthquakes
                    title="Arhivirani potresi"
                    empty="Nema arhiviranih potresa"
                    archived={true}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Flex>
      </Container>
    </VStack>
  );
};

export default HomePage;
