const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./webpack.shared.js");

const API_HOST = "http://localhost:8080";

config.mode = "development";

config.devtool = "cheap-module-eval-source-map";

config.devServer = {
  contentBase: path.resolve(__dirname, "../dist"),
  port: 3000,
  liveReload: true,
  open: false,
  overlay: true,
  proxy: {
    context: ['/V5.0', '/api'],
    target: API_HOST,
  },
  historyApiFallback: true
};

const globalVars = {
  "process.env.NODE_ENV": process.env.NODE_ENV,
  "process.env.API_ENDPOINT": API_HOST,
  "process.env.API_HOST": API_HOST,
  "process.env.INSTRUMENTATION_KEY": "e67ce01a-c17c-4596-9936-4217cf018f26",
  "process.env.APP_KEY": "FEDBC248-DE87-4E44-8FBA-6C6EDC4E6C65",
  "process.env.TAXCADDY_CPA_URL": "http://dev-taxcaddy.s3-website-us-east-1.amazonaws.com/cpa.html",
  "process.env.FILEROOM_REDIRECT": "https://stage3.sureprep.com/FileroomDashboardMerging/ManageUsers/UserManagement",
  "process.env.FILEROOM_TOKEN_REDIRECT": "https://stage3.sureprep.com/FileroomDashboardMerging/Home/AuthenticateUser?token=",
  "process.env.FILEROOM_LOGOUT": "https://stage3.sureprep.com/FileroomDashboardMerging/home/RDLogOut"

};

Object.keys(globalVars).map(
  key => (globalVars[key] = JSON.stringify(globalVars[key]))
);

config.plugins.push(new webpack.DefinePlugin(globalVars));

module.exports = config;
