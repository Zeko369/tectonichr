import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { DEFAULT_CENTER } from "../util/geo";

const ReactGLMap = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
});

export const Map: React.FC = ({ children }) => {
  return (
    <ReactGLMap
      style="mapbox://styles/mapbox/streets-v9"
      center={DEFAULT_CENTER as any}
      zoom={[7]}
      containerStyle={{ height: "100%", width: "100%" }}
    >
      {children as any}
    </ReactGLMap>
  );
};
