import { Field, Float, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Earthquake } from "./Earthquake";

export interface ISurvey {
  lat: number;
  lng: number;
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

  // TODO: Questions

  constructor(data?: ISurvey) {
    super();

    if (data) {
      this.lat = data.lat;
      this.lng = data.lng;
    }
  }
}
