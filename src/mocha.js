const otherOptions = config => {
  if (!config || !config.otherOptions) {
    return undefined;
  }

  return config.otherOptions;
};

const reporters = config => {
  if (!config || !config.mocha || !config.mocha.reporters) {
    return undefined; // let defaults fill it in later
  }

  return config.mocha.reporters;
};

const reporterOptions = config => {
  if (!config || !config.mocha || !config.mocha.reporterOptions) {
    return undefined; // let defaults fill it in later
  }

  return config.mocha.reporterOptions;
};

const testFiles = config => {
  if (!config || !config.testFiles) {
    return undefined;
  }

  return config.testFiles;
};

module.exports = {
  otherOptions,
  reporters,
  reporterOptions,
  testFiles,
};
