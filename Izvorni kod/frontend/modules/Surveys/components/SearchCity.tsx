import React, { useEffect, useRef, useState } from "react";
import { Text, VStack, Spinner } from "@chakra-ui/react";
import { useReactSelectStyles } from "chakra-form";

import { CitiesQuery, useCitiesQuery } from "generated/graphql";
import ReactSelect from "react-select";

type SearchCityProps = {
  onChange: (city: CitiesQuery["cities"][number]) => void;
};

export const SearchCity: React.FC<SearchCityProps> = ({ onChange }) => {
  const { loading, error, data } = useCitiesQuery({
    // skip: name.length === 0,
    variables: { name: "" },
  });

  const styles = useReactSelectStyles(undefined);

  const [cityId, setCityId] = useState<number>();
  const city = (data?.cities || []).find((c) => c.id === cityId);

  useEffect(() => {
    if (city) {
      onChange(city);
    }
  }, [city, onChange]);

  return (
    <VStack paddingTop="2%">
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <Text>Pogreška pri učitavanju gradova</Text>
      ) : (
        <ReactSelect
          name="cityId"
          {...styles}
          placeholder="Odaberite grad"
          onChange={(v) => setCityId(parseInt((v as any).value))}
          options={data.cities.map((city) => ({
            label: city.name,
            value: city.id.toString(),
          }))}
        />
      )}
    </VStack>
  );
};
