import "reflect-metadata";
import cors from "cors";
import { config } from "dotenv";
import express, { Express } from "express";
import { AuthChecker, buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";

import { resolvers } from "./controllers";
import { initDB } from "./db";
import {
  handleAuthenticationError,
  userMiddleware,
} from "./controllers/Auth/middleware";
import { GQLCtx, GQLReq } from "./types";
import { join } from "path";
import { FirstQuestion } from "../../shared/enums/SurveyEnums";

const authChecker: AuthChecker<GQLCtx> = ({ context }, roles) => {
  if (roles.length > 0) {
    return roles.some((r) => context.user?.role === r);
  }

  return true;
};

config({ path: join(__dirname, "../.env") });
const PORT = parseInt(process.env.PORT || "5000", 10);
export const main = async (app: Express) => {
  await initDB();
  app.use(cors({ credentials: true, origin: true }));
  app.use(userMiddleware);
  app.use(handleAuthenticationError);

  const schema = await buildSchema({
    resolvers,
    authChecker,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: GQLReq): GQLCtx => ({ req, res, user: req.user }),
  });

  await server.start();

  server.applyMiddleware({ app, cors: false, path: "/graphql" });
};

if (require.main === module) {
  (async () => {
    const app = express();
    await main(app);

    for (let item in FirstQuestion) {
      console.log(item);
    }

    app.listen(PORT, () =>
      console.log(`Listening on http://localhost:${PORT}/graphql`)
    );
  })();
}
