module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./database/auth-sprint.db3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: { directory: "./database/seeds" },
  },
  testing: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/test.db3",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  production: {
    //...
  },
};
