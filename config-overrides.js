const {
  override,
  addBabelPlugins,
  addWebpackAlias,
  addWebpackPlugin,
  // addDecoratorsLegacy,
  // disableEsLint
} = require("customize-cra");
const path = require("path");
const WebpackBar = require("webpackbar");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// const addCompression = () => config => {
//   if (process.env.NODE_ENV === "production") {
//     config.plugins.push(
//       // gzip压缩
//       new CompressionWebpackPlugin({
//         test: /\.(css|js)$/,
//         // 只处理比1kb大的资源
//         threshold: 1024,
//         // 只处理压缩率低于90%的文件
//         minRatio: 0.9
//       })
//     );
//   }
//   return config;
// };

// 查看打包后各包大小
const addAnalyzer = () => (config) => {
  if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};

module.exports = override(
  ...addBabelPlugins(
    "babel-plugin-styled-components",
    "babel-plugin-import-graphql",
    // TODO: This needs to be deleted when we finish the migration to @graphql-codegen
  ),
  // 移动端适配，px转rem 需要安装postcss-pxtorem
  // addPostcssPlugins([
  //  require("postcss-pxtorem")({
  //    // rem 转换基数
  //    rootValue: 16,
  //    // 保留五位小数点
  //    unitPrecision: 5,
  //    // 所有属性都转换
  //    propList: ["*"],
  //    // 低于2px不转换
  //    minPixelValue: 2,
  //    // 排除antd样式
  //  selectorBlackList:[/^\.ant-/,"html"]
  //  }),

  // addDecoratorsLegacy(),
  // disableEsLint(),
  // addCompression(),
  addAnalyzer(),
  addWebpackPlugin(
    // 终端进度条显示
    new WebpackBar(),
  ),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  }),
);
