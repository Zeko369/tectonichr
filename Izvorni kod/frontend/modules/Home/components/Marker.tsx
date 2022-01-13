import React from "react";
import Image from "next/image";
import { Box, Heading } from "@chakra-ui/react";
import { Marker as MapboxMarker } from "react-mapbox-gl";

export const Marker: React.FC<{ coordinates: any }> = (props) => {
  const { coordinates, children } = props;

  return (
    <MapboxMarker coordinates={coordinates} anchor="bottom">
      <Box pos="relative">
        <Image
          src="/point.png"
          alt="marker"
          height="40px"
          width="22,8571428571px"
        />
        <Heading pos="absolute" top="4px" left="4px" color="white" size="md">
          {children}
        </Heading>
      </Box>
    </MapboxMarker>
  );
};
