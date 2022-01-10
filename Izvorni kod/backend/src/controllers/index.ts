import { UserResolver } from "./User/resolver";
import { AuthResolver } from "./Auth/resolver";
import { SurveyResolver } from "./Survey/resolver";
import { EarthquakeResolver } from "./Earthquake/resolver";
import { ExportResolver } from "./Export/resolver";
import { SurveyQuestionResolver } from "./SurveyQuestion/resolver";

const resolvers = [
  UserResolver,
  AuthResolver,
  SurveyResolver,
  EarthquakeResolver,
  ExportResolver,
  SurveyQuestionResolver,
] as const;

export { resolvers };
