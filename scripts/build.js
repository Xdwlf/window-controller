#!/usr/bin/env node

const args = require("minimist")(process.argv.slice(2));
const child_process = require("child_process");
const webpackConfig = require("../config/webpack.shared");

let INSTRUMENTATION_KEY = "";
let BUILD_ENV = "";
let API_HOST = "";
let API_ENDPOINT = "";
let APP_KEY = "";
let outputfolder = webpackConfig.output.path;

if (args.env === "dev") {
  BUILD_ENV = "dev";
  INSTRUMENTATION_KEY = "";
  APP_KEY = "";
  API_HOST = "";
  API_ENDPOINT = "";
}
if (args.env === "qa") {
  BUILD_ENV = "qa";
  API_ENDPOINT = "https://apiqa.sureprep.com";
  INSTRUMENTATION_KEY = "aac5f9bd-9278-4f54-b935-6acca9a07c65";
  API_HOST = "";

}
if (args.env === "stage") {
  INSTRUMENTATION_KEY = "";
  API_ENDPOINT = "https://apistage.sureprep.com";
  BUILD_ENV = "stage";
  API_HOST = "";
}
if (args.env === "prod") {
  INSTRUMENTATION_KEY = "";
  API_ENDPOINT = "";
  BUILD_ENV = "prod";
  API_HOST = "";
}

const envOptions = [
  `BUILD_ENV=${BUILD_ENV}`,
  `API_ENDPOINT=${API_ENDPOINT}`,
  `INSTRUMENTATION_KEY=${INSTRUMENTATION_KEY}`,
  `API_HOST=${API_HOST}`,
  `APP_KEY=${APP_KEY}`,
];
const command = `npm run build -- --env.${envOptions.join(" --env.")}`;
child_process.execSync(command, { stdio: "inherit" });
