const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const config = {
  schema: [
    {
      [process.env.REACT_APP_HASURA_DEV_HTTPLINK!]: {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ["./src/graphql/**/*.graphql"],
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
