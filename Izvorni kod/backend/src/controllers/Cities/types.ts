import { Field, Float, Int, ObjectType } from "type-graphql";

export interface ICity {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  wikiDataId: string;
}

@ObjectType()
export class City {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  state_id: number;

  @Field()
  state_code: string;

  @Field()
  state_name: string;

  @Field(() => Int)
  country_id: number;

  @Field()
  country_code: string;

  @Field()
  country_name: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  wikiDataId: string;

  constructor(data: ICity) {
    this.id = data.id;
    this.name = data.name;
    this.state_id = data.state_id;
    this.state_code = data.state_code;
    this.state_name = data.state_name;
    this.country_id = data.country_id;
    this.country_code = data.country_code;
    this.country_name = data.country_name;
    this.latitude = Number(data.latitude);
    this.longitude = Number(data.longitude);
    this.wikiDataId = data.wikiDataId;
  }
}
