const {
  override,
  useBabelRc,
  addLessLoader,
  // addWebpackPlugin,
} = require("customize-cra");
// const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

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
  // addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
