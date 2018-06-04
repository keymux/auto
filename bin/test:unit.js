#!/usr/bin/env node

const util = require("util");

const { loadConfig } = require("../src/config/load_config");
const {
  processTestUnitConfig,
} = require("../src/config/process_test_unit_config");

const logResult = logFn => result => {
  if (result.stdout !== undefined && result.stderr !== undefined) {
    logFn(result.stdout);
    logFn(result.stderr);
  } else {
    logFn("stdout or stderr was missing from the result object");
    logFn(util.inspect(result, { depth: 10 }));
  }

  return result;
};

return loadConfig(process.argv.slice(2))
  .then(processTestUnitConfig)
  .then(logResult(console.log))
  .then(() => process.exit(0))
  .catch(logResult(console.error))
  .then(({ code }) => process.exit(code || -1));
