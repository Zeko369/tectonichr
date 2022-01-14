import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { ILike, IsNull, Not } from "typeorm";

import { Earthquake } from "../../models/Earthquake";
import { Survey } from "../../models/Survey";
import { EarthquakeCreateInput, EarthquakeUpdateInput } from "./inputs";

@Resolver()
export class EarthquakeResolver {
  @Query(() => [Earthquake])
  async earthquakes(
    @Arg("filter", () => String, { nullable: true }) filter?: string,
    @Arg("archived", () => Boolean, { nullable: true }) archived?: boolean
  ): Promise<Earthquake[]> {
    return Earthquake.find({
      relations: ["surveys"],
      order: { id: "DESC" },
      where: {
        ...(filter && { name: ILike(`%${filter}%`) }),
        ...(archived === undefined && {
          archivedAt: archived ? Not(IsNull()) : IsNull(),
        }),
      },
    });
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

  @Mutation(() => Earthquake)
  async archiveEarthquake(
    @Arg("id", () => Int) id: number
  ): Promise<Earthquake> {
    const earthquake = await Earthquake.findOne(id);
    if (!earthquake) {
      throw new Error("Earthquake not found");
    }

    earthquake.archivedAt = new Date();

    return earthquake.save();
  }

  @Mutation(() => Boolean)
  async deleteEarthquake(
    @Arg("id", () => Int) id: number,
    @Arg("removeSurveys", () => Boolean, { nullable: true })
    removeSurveys: boolean
  ): Promise<boolean> {
    const earthquake = await Earthquake.findOne(id, {
      relations: ["surveys", "surveys.responses"],
    });
    if (!earthquake) {
      throw new Error("Earthquake not found");
    }

    if (removeSurveys) {
      await Promise.all(
        earthquake.surveys.map((survey) =>
          Promise.all(survey.responses.map((r) => r.remove()))
        )
      );
      await Promise.all(earthquake.surveys.map((survey) => survey.remove()));
    } else {
      earthquake.surveys = [];
      await earthquake.save();
    }

    await earthquake.remove();

    return true;
  }
}
