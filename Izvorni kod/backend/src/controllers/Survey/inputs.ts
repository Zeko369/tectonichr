import { Field, Float, InputType } from "type-graphql";

@InputType()
export class FilterSurveys {
  @Field(() => Boolean, { nullable: true })
  merged: boolean;
}

@InputType()
export class SurveyCreateInput {
  @Field(() => Float, { nullable: true })
  lat: number;

  @Field(() => Float, { nullable: true })
  lng: number;
}
