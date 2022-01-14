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

  private calcCenter(field: "lat" | "lng", surveys: Survey[]) {
    return (
      surveys.map((s) => s[field]).reduce((a, b) => a + b, 0) / surveys.length
    );
  }

  private distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const p = Math.PI / 180;

    return (
      12742 *
      Math.asin(
        Math.sqrt(
          0.5 -
            Math.cos((lat2 - lat1) * p) / 2 +
            (Math.cos(lat1 * p) *
              Math.cos(lat2 * p) *
              (1 - Math.cos((lon2 - lon1) * p))) /
              2
        )
      )
    );
  }

  @Mutation(() => Earthquake)
  async mergeSurveys(
    @Arg("data") data: EarthquakeCreateInput
  ): Promise<Earthquake> {
    const surveys = await Survey.findByIds(data.surveyIds);

    const { lat, lng } = {
      lat: this.calcCenter("lat", surveys),
      lng: this.calcCenter("lng", surveys),
    };

    const strongest = surveys.sort((a, b) => b.strength - a.strength)[0];
    if (!strongest) {
      throw new Error("No strongest survey found");
    }

    const r = this.distance(strongest.lat, strongest.lng, lat, lng);
    const int =
      strongest.strength + 3 * Math.log10(r / 10) + 3 * 0.0021715 * (r - 10);

    const earthquake = new Earthquake({
      date: new Date(),
      epicenterLat: this.calcCenter("lat", surveys),
      epicenterLng: this.calcCenter("lng", surveys),
      name: data.name,
      strength: int,
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
