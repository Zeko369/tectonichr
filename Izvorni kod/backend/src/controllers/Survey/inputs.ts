import { Field, Float, InputType } from "type-graphql";
import { FirstQuestion, SecondQuestion, ThirdQuestion, FourthQuestion, FifthQuestion, SixthQuestion, SeventhQuestion, EighthQuestion, NinthQuestion, TenthQuestion } from "../../../../shared/enums/SurveyEnums";

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

  @Field(() => String)
  firstQuestion: FirstQuestion;

  @Field(() => String)
  secondQuestion: SecondQuestion;

  @Field(() => String)
  thirdQuestion: ThirdQuestion;

  @Field(() => String)
  fourthQuestion: FourthQuestion;

  @Field(() => String)
  fifthQuestion: FifthQuestion;

  @Field(() => String)
  sixthQuestion: SixthQuestion;

  @Field(() => String)
  seventhQuestion: SeventhQuestion;

  @Field(() => String)
  eighthQuestion: EighthQuestion;

  @Field(() => String)
  ninthQuestion: NinthQuestion;

  @Field(() => String)
  tenthQuestion: TenthQuestion;
}
