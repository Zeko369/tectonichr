import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { hash } from "bcryptjs";

import { User } from "../../models/User";
import { CreateUserInput } from "./inputs";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput): Promise<User> {
    const passwordHash = await hash(data.password, 10);
    const user = new User({ email: data.email, passwordHash });

    await user.save();
    return user;
  }
}
