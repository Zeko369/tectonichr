import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

import { Earthquake } from "../../models/Earthquake";
import { Survey } from "../../models/Survey";
import { EarthquakeCreateInput, EarthquakeUpdateInput } from "./inputs";

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

  @Mutation(() => Earthquake)
  async updateEarthquake(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: EarthquakeUpdateInput
  ): Promise<Earthquake> {
    const earthquake = await Earthquake.findOne(id, { relations: ["surveys"] });
    if (!earthquake) {
      throw new Error("Earthquake not found");
    }

    earthquake.name = data.name ?? earthquake.name;
    if (data.addSurveyIds && data.addSurveyIds.length > 0) {
      const surveys = await Survey.findByIds(data.addSurveyIds);
      earthquake.surveys.push(...surveys);
    }

    if (data.removeSurveyIds && data.removeSurveyIds.length > 0) {
      earthquake.surveys = earthquake.surveys.filter(
        (s) => !data.removeSurveyIds?.includes(s.id)
      );
    }

    return earthquake.save();
  }
}
