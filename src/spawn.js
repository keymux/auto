const { spawn } = require("child_process");

const _spawnPromiseTestableCreator = (spawn, logFn) => passingExitCodes => (
  command,
  args,
  options
) =>
  new Promise((resolve, reject) => {
    const proc = spawn(command, args, options);

    logFn("Spawned process with args: ");
    logFn(" ", command, args.join(" "));

    const stdout = [];
    const stderr = [];

    proc.stdout.on("data", data => {
      stdout.push(data);
    });

    proc.stderr.on("data", data => {
      stderr.push(data);
    });

    proc.on("close", code => {
      const result = {
        code,
        stdout: stdout.join(""),
        stderr: stderr.join(""),
      };

      if (passingExitCodes.includes(code)) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });

const spawnOptions = config => {
  if (!config || !config.spawnOptions) {
    return undefined; // let defaults fill it in later
  }

  return config.spawnOptions;
};

const spawnPromiseCreator = _spawnPromiseTestableCreator(spawn, console.log);

const spawnPromise = spawnPromiseCreator([0]);

module.exports = {
  _spawnPromiseTestableCreator,
  spawnOptions,
  spawnPromise,
  spawnPromiseCreator,
};
