#!/usr/bin/env node

const args = require("minimist")(process.argv.slice(2));
const child_process = require("child_process");
const webpackConfig = require("../config/webpack.shared");

const command = `npm run build -- --env.${envOptions.join(" --env.")}`;
child_process.execSync(command, { stdio: "inherit" });
