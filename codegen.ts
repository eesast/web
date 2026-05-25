import dotenv from "dotenv";
import path from "path";
import type { CodegenConfig } from "@graphql-codegen/cli";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const config: CodegenConfig = {
  schema: [
    {
      [process.env.REACT_APP_HASURA_DEV_HTTPLINK!]: {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET!,
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
      config: {
        // Keep legacy-compatible scalar behavior and avoid `unknown` widening.
        defaultScalarType: "any",
        // Preserve schema operation references instead of inlining every type.
        preResolveTypes: false,
      },
    },
  },
};

export default config;
