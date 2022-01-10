import { Field, Float, InputType, ObjectType } from "type-graphql";

@InputType()
export class FilterSurveys {
  @Field(() => Boolean, { nullable: true })
  merged: boolean;
}

@InputType()
export class SurveyQuestionResponse {
  @Field(() => String)
  questionId: string;

  @Field(() => String)
  optionId: string;
}

@InputType()
export class SurveyCreateInput {
  @Field(() => Float, { nullable: true })
  lat: number;

  @Field(() => Float, { nullable: true })
  lng: number;

  @Field(() => [SurveyQuestionResponse])
  responses: SurveyQuestionResponse[];
}
