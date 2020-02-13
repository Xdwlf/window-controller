#!/usr/bin/env node

const args = require("minimist")(process.argv.slice(2));
const path = require('path');
const child_process = require("child_process");

let outputFolder = path.resolve(__dirname, '../dist');

let outputBucket = "";
let cloudFrontID = "";

if (args.env === "dev") {
  outputBucket = "";
  cloudFrontID = '';
}
if (args.env === "qa") {
  cloudFrontID = '';
  outputBucket = "";
}
if (args.env === "stage") {
  outputBucket = "";
  cloudFrontID = '';
}
if (args.env === "prod") {
  outputBucket = "";
  cloudFrontID = '';
}

child_process.execSync(`aws s3 rm s3://${outputBucket} --recursive`, {
  stdio: "inherit"
});
child_process.execSync(
  `aws s3 cp ${outputFolder} s3://${outputBucket} --recursive`,
  { stdio: "inherit" }
);

child_process.execSync(
  `aws s3 cp ${outputFolder}/index.html s3://${outputBucket}/index.html --cache-control "no-cache, no-store, must-revalidate" --expires "Wed, 21 Oct 2015 07:28:00 GMT"`,
  { stdio: "inherit" }
);


if (cloudFrontID) {
  child_process.execSync(
    `aws cloudfront create-invalidation --distribution-id ${cloudFrontID} --paths "/*"`,
    { stdio: "inherit" }
  );
}

if (args.env === "prod") {
  // curl -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
  //    -H "Authorization: Bearer $CLOUDFLARE_PURGE_KEY" \
  //    -H "Content-Type: application/json" \
  //    --data '{"purge_everything":true}'
}
