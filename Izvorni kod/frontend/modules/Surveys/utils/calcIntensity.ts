export const calcIntensity = (intensities: string[]): number => {
  const data = intensities
    .map((intensity) => {
      if (intensity.includes("|")) {
        return intensity.split("|").map(Number);
      }

      const tmp = parseInt(intensity, 10);
      if (!isNaN(tmp)) {
        return [tmp];
      }

      return [];
    })
    .flat();

  let res = data.sort((a, b) => b - a)[0] || 0;
  const moreThan = intensities.filter((a) => a.startsWith(">"));
  if (moreThan.length > 0) {
    for (let more of moreThan) {
      more = more.slice(1);
      if (more.startsWith("=")) {
        more = more.slice(1);
      }

      const num = parseInt(more, 10) || -1;
      if (res < num) {
        res = num;
      }
    }
  }

  return res;
};
