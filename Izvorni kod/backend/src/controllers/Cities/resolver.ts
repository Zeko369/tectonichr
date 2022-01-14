import { Arg, Query, Resolver } from "type-graphql";
import { City, ICity } from "./types";

import citiesData from "../../data/cities.json";

@Resolver()
export class CityResolver {
  @Query(() => [City])
  cities(@Arg("filter", { nullable: false }) filter?: string) {
    const results = (citiesData as ICity[])
      .filter((city) => {
        return city.name.toLowerCase().includes((filter || "").toLowerCase());
      })
      .map((city) => new City(city));

    return results;
  }
}
