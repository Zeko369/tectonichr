import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";

import { Survey } from "../../models/Survey";
import { FilterSurveys, SurveyCreateInput } from "./inputs";
import { UserRole } from "../../models/User";
import { SurveyResponse } from "../../models/SurveyResponse";

@Resolver()
export class SurveyResolver {
  @Query(() => [Survey])
  async surveys(
    @Arg("filter") filter: FilterSurveys,
    @Arg("limit", () => Int, { nullable: true }) limit: number
  ): Promise<Survey[]> {
    return Survey.find({
      where: filter.merged === null ? {} : { earthquake: null },
      relations: ["responses"],
      take: limit ? limit : undefined,
    });
  }

  @Mutation(() => Survey)
  async submitSurvey(@Arg("data") data: SurveyCreateInput): Promise<Survey> {
    const survey = new Survey({
      lat: data.lat || 0,
      lng: data.lng || 0,
      strength: data.strength,
      city: data.city,
    });

    await survey.save();

    await Promise.all(
      data.responses.map((resp) => {
        const tmp = new SurveyResponse({
          optionId: resp.optionId,
          questionId: resp.questionId,
        });

        tmp.survey = survey;
        return tmp.save();
      })
    );

    return survey;
  }

  @Mutation(() => Boolean)
  @Authorized(UserRole.ADMIN)
  async deleteSurvey(@Arg("id", () => Int) id: number): Promise<boolean> {
    const survey = await Survey.findOne(id, { relations: ["responses"] });
    if (!survey) {
      throw new Error("Survey not found");
    }

    await Promise.all(survey.responses.map((r) => r.remove()));

    await survey.remove();
    return true;
  }
}
