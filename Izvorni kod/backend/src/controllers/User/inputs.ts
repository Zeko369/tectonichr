import { Field, InputType, Int } from "type-graphql";
import { UserRole } from "../../models/User";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;

  @Field(() => String, { nullable: true })
  email?: string;
}

@InputType()
export class DeleteUserInput {
  @Field(() => Int)
  id: number;
}
