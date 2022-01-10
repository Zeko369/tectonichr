import { Field, Float, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { BaseModel } from "./BaseModel";
import { Earthquake } from "./Earthquake";
import { SurveyResponse } from "./SurveyResponse";

export interface ISurvey {
  lat: number;
  lng: number;
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

  @Field(() => Earthquake, { nullable: true })
  @ManyToOne(() => Earthquake, (earthquake) => earthquake.surveys, {
    nullable: true,
  })
  earthquake?: Earthquake;

  @Field(() => [SurveyResponse])
  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.survey)
  responses: SurveyResponse[];

  constructor(data?: ISurvey) {
    super();

    if (data) {
      this.lat = data.lat;
      this.lng = data.lng;
    }
  }
}
