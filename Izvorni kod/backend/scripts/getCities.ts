import { join } from "path";
import { writeFile } from "fs/promises";
import axios from "axios";

const URL =
  "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json";

(async () => {
  console.log("fetching...");

  const res = await axios(URL);
  const filtered = res.data.filter((city: any) => city.country_code === "HR");

  // TODO: Filter "Grad name" and "name" -> "name"

  await writeFile(
    join(__dirname, "../src/data/cities.json"),
    JSON.stringify(filtered, null, 2)
  );
})();
