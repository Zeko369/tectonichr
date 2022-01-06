import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";

import { Survey } from "../../models/Survey";
import { FilterSurveys, SurveyCreateInput } from "./inputs";
import { UserRole } from "../../models/User";

@Resolver()
export class SurveyResolver {
  @Query(() => [Survey])
  async surveys(@Arg("filter") filter: FilterSurveys): Promise<Survey[]> {
    return Survey.find({ where: { earthquake: null } });
  }

  @Mutation(() => Survey)
  async submitSurvey(@Arg("data") data: SurveyCreateInput): Promise<Survey> {
    const survey = new Survey({
      lat: data.lat || 0,
      lng: data.lng || 0,
    });

    await survey.save();

    return survey;
  }

  @Mutation(() => Boolean)
  @Authorized(UserRole.ADMIN)
  async deleteSurvey(@Arg("id", () => Int) id: number): Promise<boolean> {
    const survey = await Survey.findOne(id);
    if (!survey) {
      throw new Error("Survey not found");
    }

    await survey.remove();

    return true;
  }
}
