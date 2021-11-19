import { UserResolver } from "./User/resolver";
import { AuthResolver } from "./Auth/resolver";
import { SurveyResolver } from "./Survey/resolver";

const resolvers = [UserResolver, AuthResolver, SurveyResolver] as const;

export { resolvers };
