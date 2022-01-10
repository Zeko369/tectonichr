import { Query, Resolver } from "type-graphql";
import { SurveyQuestion, surveyQuestions } from "../../data/surveyQuestions";

@Resolver()
export class SurveyQuestionResolver {
  @Query(() => [SurveyQuestion])
  questions() {
    return surveyQuestions;
  }
}
