import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";

export interface IUser {
  email: string;
  passwordHash: string;
}

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseModel implements IUser {
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column({ unique: true, name: "password_hash" })
  passwordHash: string;

  constructor(data?: IUser) {
    super();

    if (data) {
      this.email = data.email;
      this.passwordHash = data.passwordHash;
    }
  }
}
