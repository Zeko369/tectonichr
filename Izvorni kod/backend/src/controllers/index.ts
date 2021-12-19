import { UserResolver } from "./User/resolver";
import { AuthResolver } from "./Auth/resolver";
import { SurveyResolver } from "./Survey/resolver";
import { EarthquakeResolver } from "./Earthquake/resolver";
import { ExportResolver } from "./Export/resolver";

const resolvers = [
  UserResolver,
  AuthResolver,
  SurveyResolver,
  EarthquakeResolver,
  ExportResolver,
] as const;

export { resolvers };
