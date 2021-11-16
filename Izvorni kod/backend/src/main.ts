import "reflect-metadata";
import cors from "cors";
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";

import { resolvers } from "./controllers";
import { initDB } from "./db";

const PORT = 5000;
export const main = async (app: Express) => {
  await initDB();
  app.use(cors({ credentials: true, origin: true }));

  const schema = await buildSchema({ resolvers, validate: false });
  const server = new ApolloServer({ schema });

  await server.start();

  server.applyMiddleware({ app, cors: false, path: "/graphql" });
};

if (require.main === module) {
  (async () => {
    const app = express();
    await main(app);

    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}/graphql`));
  })();
}
