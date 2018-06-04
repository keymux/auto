const nycOptions = config => {
  if (!config || !config.nycOptions) {
    return undefined; // let defaults fill it in later
  }

  return config.nycOptions;
};

module.exports = {
  nycOptions,
};
