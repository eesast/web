const {
  override,
  useBabelRc,
  addLessLoader,
  addWebpackPlugin,
} = require("customize-cra");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const { addReactRefresh } = require("customize-cra-react-refresh");

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
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),

  // TODO: remove this when CRA officially supports Fast Refresh
  addReactRefresh()
);
