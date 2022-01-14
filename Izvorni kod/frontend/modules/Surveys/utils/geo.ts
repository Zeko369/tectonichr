export const getCoordinates = async () => {
  const val = await navigator.permissions.query({ name: "geolocation" });
  if (val.state === "denied") {
    return null;
  }

  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      resolve(pos.coords);
    }, reject);
  });
};
