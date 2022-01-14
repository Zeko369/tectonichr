import React from "react";
import Image from "next/image";
import { Box, Heading } from "@chakra-ui/react";
import { Marker as MapboxMarker } from "react-mapbox-gl";

type MarkerProps = { coordinates: any; top?: any; color: any };

export const Marker: React.FC<MarkerProps> = (props) => {
  const { coordinates, top, color, children } = props;

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
          bg={color ? `${color}.400` : "black"}
          borderRadius="4px"
          zIndex="-1"
        >
          {children}
        </Heading>
      </Box>
    </MapboxMarker>
  );
};
