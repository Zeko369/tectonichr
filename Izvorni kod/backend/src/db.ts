import "reflect-metadata";
import { createConnection, getConnectionOptions, ConnectionOptions } from "typeorm";

export const initDB = async () => {
  const connectionOptions = await getConnectionOptions();
  return createConnection({
    ...connectionOptions,
    username: process.env["DB_USER"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_NAME"],
    host: process.env["DB_URL"],
  } as ConnectionOptions);
};
