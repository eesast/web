const { override, useBabelRc, addLessLoader } = require("customize-cra");

module.exports = override(
  useBabelRc(),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#027dcd",
        "@layout-body-background": "#fff",
        "@layout-header-background": "#fff",
      },
    },
  }),
);
