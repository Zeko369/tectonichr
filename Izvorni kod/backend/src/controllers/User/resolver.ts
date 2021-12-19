import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { hash } from "bcryptjs";

import { User, UserRole } from "../../models/User";
import { CreateUserInput, DeleteUserInput, UpdateUserInput } from "./inputs";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  @Authorized(UserRole.ADMIN)
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Mutation(() => User)
  @Authorized(UserRole.ADMIN)
  async createUser(@Arg("data") data: CreateUserInput): Promise<User> {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("EMAIL_IN_USE");
    }

    const passwordHash = await hash(data.password, 10);
    const user = new User({
      email: data.email,
      passwordHash,
      role: UserRole.SEISMOLOGISTS,
    });

    await user.save();
    return user;
  }

  @Mutation(() => User)
  @Authorized(UserRole.ADMIN)
  async updateUser(@Arg("data") data: UpdateUserInput): Promise<User> {
    const user = await User.findOne({ where: { id: data.id } });
    if (!user) {
      throw new Error("user not found");
    }

    user.email = data.email ?? user.email;
    user.role = data.role ?? user.role;

    return user.save();
  }

  @Mutation(() => Boolean)
  @Authorized(UserRole.ADMIN)
  async deleteUser(@Arg("data") data: DeleteUserInput): Promise<boolean> {
    const user = await User.findOne({ where: { id: data.id } });
    if (!user) {
      throw new Error("user not found");
    }

    await user.remove();
    return true;
  }
}
