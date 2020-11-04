const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

module.exports = process.env.NODE_ENV === "production" ? {
  client: {
    includes: ["src/api/**/*.graphql"],
    service: {
      name: "eesast",
      url: "https://api.eesast.com/v1/graphql",
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  }
} : {
  client: {
    includes: ["src/api/**/*.graphql"],
    service: {
      name: "eesast-dev",
      url: process.env.REACT_APP_HASURA_INSTANCE === "local"
      ? "http://localhost:23333/v1/graphql"
      : "https://api.eesast.com/dev/v1/graphql"
    }
  }
};
