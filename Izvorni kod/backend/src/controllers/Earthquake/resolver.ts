import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Earthquake } from "../../models/Earthquake";
import { Survey } from "../../models/Survey";
import { EarthquakeCreateInput } from "./inputs";

@Resolver()
export class EarthquakeResolver {
  @Query(() => [Earthquake])
  async earthquakes(): Promise<Earthquake[]> {
    return Earthquake.find({ relations: ["surveys"] });
  }

  @Mutation(() => Earthquake)
  async mergeSurveys(
    @Arg("data") data: EarthquakeCreateInput
  ): Promise<Earthquake> {
    const surveys = await Survey.findByIds(data.surveyIds);
    const earthquake = new Earthquake({
      date: new Date(), // TODO: Pass data,
      epicenterLat: 0,
      epicenterLng: 0,
      name: data.name,
      strength: 5,
    });

    earthquake.surveys = surveys;

    return earthquake.save();
  }
}
