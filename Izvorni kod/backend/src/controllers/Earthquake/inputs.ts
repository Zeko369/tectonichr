import { Field, InputType, Int } from "type-graphql";

@InputType()
export class EarthquakeCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => [Int])
  surveyIds: number[];
}

@InputType()
export class EarthquakeUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [Int], { nullable: true })
  addSurveyIds?: number[];

  @Field(() => [Int], { nullable: true })
  removeSurveyIds?: number[];
}
