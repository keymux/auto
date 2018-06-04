const {
  otherOptions,
  reporters,
  reporterOptions,
  testFiles,
} = require("../mocha");

const { nycOptions } = require("../nyc");

const { spawnOptions, spawnPromise } = require("../spawn");

const TEST_UNIT = "test:unit";

const DEFAULTS = {
  nycOptions: [],
  reportFile: ".test.report",
  reporters: ["mochawesome"],
  reporterOptions: ["reportDir=reports/unit"],
  otherOptions: ["--colors", "--recursive"],
  testFiles: ["test/unit"],
  spawnOptions: {},
};

const spawnTestUnitPromise = config => {
  const exec = "yarn";

  const args = ["nyc"]
    .concat(config.nycOptions)
    .concat(["mocha"])
    .concat(config.reporters.map(reporter => `--reporter=${reporter}`))
    .concat(["--reporter-options", config.reporterOptions.join(",")])
    .concat(config.otherOptions)
    .concat(config.testFiles);

  return spawnPromise(exec, args, config.spawnOptions);
};

const processTestUnitConfig = config => {
  const unitTestConfig = config[TEST_UNIT];

  const localConfig = {
    nycOptions: nycOptions(unitTestConfig),
    otherOptions: otherOptions(unitTestConfig),
    reportFile: config.reportFile,
    reporters: reporters(unitTestConfig),
    reporterOptions: reporterOptions(unitTestConfig),
    testFiles: testFiles(unitTestConfig),
    spawnOptions: spawnOptions(unitTestConfig),
  };

  // Delete undefined, null, or otherwise falsy keys
  // Unless the value is actually false
  Object.keys(localConfig).forEach(key => {
    const val = localConfig[key];

    if (!val && val !== false) {
      delete localConfig[key];
    }
  });

  return spawnTestUnitPromise(Object.assign({}, DEFAULTS, localConfig));
};

module.exports = {
  _DEFAULTS: DEFAULTS,
  processTestUnitConfig,
};
