/* eslint-disable */
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const { modifiedVariables } = require("./constants/theme");

const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  ...withLess(
    withSass({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: modifiedVariables,
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      webpack: (config) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.plugins.push(
          new CopyPlugin({
            patterns: [
              {
                from: "node_modules/pdfjs-dist/cmaps/",
                to: "cmaps/",
              },
            ],
          })
        );
        console.log(config.plugins);
        // Important: return the modified config
        return config;
      },
    })
  ),
});
