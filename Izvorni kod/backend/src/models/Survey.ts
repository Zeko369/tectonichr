import { Field, Float, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Earthquake } from "./Earthquake";
import {
  EighthQuestion,
  FifthQuestion,
  FirstQuestion,
  FourthQuestion,
  NinthQuestion,
  SecondQuestion,
  SeventhQuestion,
  SixthQuestion,
  TenthQuestion,
  ThirdQuestion,
} from "../../../shared/enums/SurveyEnums";

export interface ISurvey {
  lat: number;
  lng: number;
  firstQuestion: FirstQuestion;
  secondQuestion: SecondQuestion;
  thirdQuestion: ThirdQuestion;
  fourthQuestion: FourthQuestion;
  fifthQuestion: FifthQuestion;
  sixthQuestion: SixthQuestion;
  seventhQuestion: SeventhQuestion;
  eighthQuestion: EighthQuestion;
  ninthQuestion: NinthQuestion;
  tenthQuestion: TenthQuestion;
}

@ObjectType()
@Entity({ name: "surveys" })
export class Survey extends BaseModel implements ISurvey {
  @Field(() => Float)
  @Column({ type: "float4" })
  lat: number;

  @Field(() => Float)
  @Column({ type: "float4" })
  lng: number;

  @Field(() => Earthquake, { nullable: true })
  @ManyToOne(() => Earthquake, (earthquake) => earthquake.surveys, {
    nullable: true,
  })
  earthquake?: Earthquake;

  @Field(() => String)
  @Column({ type: "enum", enum: FirstQuestion, default: FirstQuestion.NITKO })
  firstQuestion: FirstQuestion;

  @Field(() => String)
  @Column({ type: "enum", enum: SecondQuestion, default: SecondQuestion.NITKO })
  secondQuestion: SecondQuestion;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: ThirdQuestion,
    default: ThirdQuestion.SE_NISU_TRESLI,
  })
  thirdQuestion: ThirdQuestion;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: FourthQuestion,
    default: FourthQuestion.SE_NISU_TRESLI,
  })
  fourthQuestion: FourthQuestion;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: FifthQuestion,
    default: FifthQuestion.SE_NISU_NJIHALI,
  })
  fifthQuestion: FifthQuestion;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: SixthQuestion,
    default: SixthQuestion.NIJE_BUDIO,
  })
  sixthQuestion: SixthQuestion;

  @Field(() => String)
  @Column({ type: "enum", enum: SeventhQuestion, default: SeventhQuestion.NE })
  seventhQuestion: SeventhQuestion;

  @Field(() => String)
  @Column({ type: "enum", enum: EighthQuestion, default: EighthQuestion.NISU })
  eighthQuestion: EighthQuestion;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: NinthQuestion,
    default: NinthQuestion.NITI_JEDNA,
  })
  ninthQuestion: NinthQuestion;

  @Field(() => String)
  @Column({ type: "enum", enum: TenthQuestion, default: TenthQuestion.NIJE })
  tenthQuestion: TenthQuestion;

  // TODO: Questions

  constructor(data?: ISurvey) {
    super();

    if (data) {
      this.lat = data.lat;
      this.lng = data.lng;
      this.firstQuestion = data.firstQuestion;
      this.secondQuestion = data.secondQuestion;
      this.thirdQuestion = data.thirdQuestion;
      this.fourthQuestion = data.fourthQuestion;
      this.fifthQuestion = data.fifthQuestion;
      this.sixthQuestion = data.sixthQuestion;
      this.seventhQuestion = data.seventhQuestion;
      this.eighthQuestion = data.eighthQuestion;
      this.ninthQuestion = data.ninthQuestion;
      this.tenthQuestion = data.tenthQuestion;
    }
  }
}
