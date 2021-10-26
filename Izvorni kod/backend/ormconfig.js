require("dotenv").config();

const dbConfig = {
  port: 5432,
  host: process.env.DB_URL,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

module.exports = {
  type: "postgres",
  ...dbConfig,
  synchronize: false,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["db/migrations/**/*.ts"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "db/migrations",
  },
};
