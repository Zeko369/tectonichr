import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";

export enum UserRole {
  ADMIN = "admin",
  SEISMOLOGISTS = "seismologists",
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "Role of the user",
});

export interface IUser {
  email: string;
  passwordHash: string;
  role?: UserRole;
}

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseModel implements IUser {
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column({ unique: true, name: "password_hash" })
  passwordHash: string;

  @Field(() => UserRole)
  @Column({ type: "enum", enum: UserRole, default: UserRole.SEISMOLOGISTS })
  role: UserRole;

  constructor(data?: IUser) {
    super();

    if (data) {
      this.email = data.email;
      this.passwordHash = data.passwordHash;
      this.role = data.role || UserRole.SEISMOLOGISTS;
    }
  }
}
