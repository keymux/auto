const minimist = require("minimist");
const path = require("path");

const promisrFS = require("@keymux/promisrfs");

const _loadConfigCreator = (minimist, promisrFS, require, path) => args => {
  const argv = minimist(args);

  const configFile = path.resolve(argv["config"] || ".test.config.js");

  return promisrFS
    .statPromise(configFile)
    .then(stats => stats.isFile())
    .then(() => require(configFile))
    .catch(() => {});
};

const loadConfig = _loadConfigCreator(minimist, promisrFS, require, path);

module.exports = {
  _loadConfigCreator,
  loadConfig,
};
