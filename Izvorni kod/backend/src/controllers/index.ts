import { UserResolver } from "./User/resolver";
import { AuthResolver } from "./Auth/resolver";

const resolvers = [UserResolver, AuthResolver] as const;

export { resolvers };
