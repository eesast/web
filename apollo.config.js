const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

module.exports = {
  client: {
    includes: ["src/api/**/*.graphql"],
    service: {
      name: "eesast",
      url: "https://api.eesast.com/v1/graphql",
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
};
