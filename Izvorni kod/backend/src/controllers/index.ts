import { UserResolver } from "./User/resolver";
import { AuthResolver } from "./Auth/resolver";
import { SurveyResolver } from "./Survey/resolver";
import { EarthquakeResolver } from "./Earthquake/resolver";

const resolvers = [
  UserResolver,
  AuthResolver,
  SurveyResolver,
  EarthquakeResolver,
] as const;

export { resolvers };
