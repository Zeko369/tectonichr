import { UserResolver } from "./User/resolver";
import { AuthResolver } from "./Auth/resolver";
import { SurveyResolver } from "./Survey/resolver";
import { EarthquakeResolver } from "./Earthquake/resolver";
import { ExportResolver } from "./Export/resolver";
import { SurveyQuestionResolver } from "./SurveyQuestion/resolver";
import { CityResolver } from "./Cities/resolver";

const resolvers = [
  UserResolver,
  AuthResolver,
  SurveyResolver,
  EarthquakeResolver,
  ExportResolver,
  SurveyQuestionResolver,
  CityResolver,
] as const;

export { resolvers };
