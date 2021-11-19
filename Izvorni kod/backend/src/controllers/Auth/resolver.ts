import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { compare, hash } from "bcryptjs";

import { User } from "../../models/User";
import { GQLCtx } from "../../types";
import { LoginInput } from "./inputs";
import { sign } from "jsonwebtoken";

@ObjectType()
class LoginResponse extends User {
  public constructor(user: User) {
    super({ ...user });
    this.id = user.id;
  }

  @Field(() => String)
  token: string;
}

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() ctx: GQLCtx): User | null {
    return ctx.user || null;
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("data") data: LoginInput): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      throw new Error("EMAIL_NOT_FOUND");
    }

    if (!(await compare(data.password, user.passwordHash))) {
      throw new Error("WRONG_PASSWORD");
    }

    const response = new LoginResponse(user);
    response.token = sign({ id: user.id }, process.env["JWT_SECRET"]!, {
      expiresIn: "31d",
    });

    return response;
  }
}
