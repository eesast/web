const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});
dotenv.config();

// module.exports =
//   process.env.NODE_ENV === "production"
//     ? {
//         client: {
//           includes: ["src/api/**/*.graphql"],
//           service: {
//             name: "eesast",
//             url: process.env.REACT_APP_HASURA_HTTPLINK,
//             headers: {
//               "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
//             },
//           },
//         },
//       }
//     : {
//         client: {
//           includes: ["src/api/**/*.graphql"],
//           service: {
//             name: "eesast-dev",
//             url: process.env.REACT_APP_HASURA_DEV_HTTPLINK,
//             headers: {
//               "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
//             },
//           },
//         },
//       };

module.exports = {
  client: {
    includes: ["src/api/**/*.graphql"],
    service: {
      name: "eesast-dev",
      url: process.env.REACT_APP_HASURA_DEV_HTTPLINK,
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
};
