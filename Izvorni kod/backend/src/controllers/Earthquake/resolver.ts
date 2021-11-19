import { Query, Resolver } from "type-graphql";

import { Earthquake } from "../../models/Earthquake";

@Resolver()
export class EarthquakeResolver {
  @Query(() => [Earthquake])
  async earthquakes(): Promise<Earthquake[]> {
    return Earthquake.find({ relations: ["surveys"] });
  }
}
