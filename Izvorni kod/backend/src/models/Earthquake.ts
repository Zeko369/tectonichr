import { Field, Int, Float, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Survey } from "./Survey";

interface IEarthquake {
  name: string;

  strength: number;
  epicenterLat: number;
  epicenterLng: number;
  date: Date;
}

@ObjectType()
@Entity({ name: "earthquakes" })
export class Earthquake extends BaseModel implements IEarthquake {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Float)
  @Column({ type: "float4" })
  strength: number;

  @Field(() => Float)
  @Column({ name: "epicenter_lat", type: "float4" })
  epicenterLat: number;

  @Field(() => Float)
  @Column({ name: "epicenter_lng", type: "float4" })
  epicenterLng: number;

  @Field(() => Float)
  @Column({ type: "timestamp" })
  date: Date;

  @Field(() => Float, { nullable: true })
  @Column({ type: "timestamp", name: "archived_at", nullable: true })
  archivedAt: Date | null;

  @Field(() => [Survey])
  @OneToMany(() => Survey, (survey) => survey.earthquake)
  surveys: Survey[];

  constructor(data?: IEarthquake) {
    super();

    if (data) {
      this.name = data.name;
      this.strength = data.strength;
      this.epicenterLat = data.epicenterLat;
      this.epicenterLng = data.epicenterLng;
      this.date = data.date;
    }
  }
}
