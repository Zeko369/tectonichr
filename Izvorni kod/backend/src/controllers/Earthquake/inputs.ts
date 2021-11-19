import { Field, InputType, Int } from "type-graphql";

@InputType()
export class EarthquakeCreateInput {
  @Field(() => [Int])
  surveyIds: number[];

  @Field(() => String)
  name: string;
}
