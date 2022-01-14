import { Field, Float, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { BaseModel } from "./BaseModel";
import { Earthquake } from "./Earthquake";
import { SurveyResponse } from "./SurveyResponse";

export interface ISurvey {
  lat: number;
  lng: number;
  strength: number;
  city: string;
}

@ObjectType()
export class QuestionResponse {
  @Field(() => String)
  questionId: string;

  @Field(() => String)
  optionId: string;
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

  @Field(() => String)
  @Column({ default: "" })
  city: string;

  @Field(() => Earthquake, { nullable: true })
  @ManyToOne(() => Earthquake, (earthquake) => earthquake.surveys, {
    nullable: true,
  })
  earthquake?: Earthquake;

  @Field(() => Int)
  @Column({ type: "int4", default: 0 })
  strength: number;

  @Field(() => [SurveyResponse])
  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.survey)
  responses: SurveyResponse[];

  constructor(data?: ISurvey) {
    super();

    if (data) {
      this.lat = data.lat;
      this.lng = data.lng;
      this.city = data.city;
      this.strength = data.strength;
    }
  }
}
