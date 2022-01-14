import React from "react";
import Image from "next/image";
import { Box, Heading } from "@chakra-ui/react";
import { Marker as MapboxMarker } from "react-mapbox-gl";

export const Marker: React.FC<{ coordinates: any; top?: any }> = (props) => {
  const { coordinates, top, children } = props;

  return (
    <MapboxMarker coordinates={coordinates} anchor="bottom">
      <Box pos="relative">
        <Image
          src="/point.png"
          alt="marker"
          height="40px"
          width="22,8571428571px"
        />

        <Heading
          pos="absolute"
          top={top || "-32px"}
          left="0"
          color="white"
          size="sm"
          p="1"
          bg="black"
          borderRadius="4px"
          zIndex="-1"
        >
          {children}
        </Heading>
      </Box>
    </MapboxMarker>
  );
};
