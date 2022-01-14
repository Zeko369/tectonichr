export const DEFAULT_CENTER = [15.9819, 45.815];

export const getCenter = () => {
  return new Promise<[number, number]>((res, rej) => {
    if (!navigator?.geolocation) {
      return res(DEFAULT_CENTER as any);
    }

    navigator.geolocation.getCurrentPosition(
      (data) => {
        res([data.coords.longitude, data.coords.latitude]);
      },
      () => {
        res(DEFAULT_CENTER as any);
      }
    );
  });
};
