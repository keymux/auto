const { expect } = require("chai");
const { spy } = require("sinon");

const uuid = require("uuid");

const {
  _spawnPromiseTestableCreator,
  spawnOptions,
} = require("../../src/spawn");

describe("spawn.js", () => {
  describe("_spawnPromiseTestableCreator()", () => {
    let command;
    let args;
    let options;
    let mockStdout;
    let mockStderr;
    let exitCode;

    beforeEach(() => {
      command = uuid();
      args = [uuid(), uuid()];
      options = uuid();

      mockStdout = [uuid(), uuid()];
      mockStderr = [uuid(), uuid()];
      exitCode = uuid();
    });

    const mockOnCreator = values => (str, cb) => values.forEach(cb);
    const proc = () => ({
      stdout: {
        on: mockOnCreator(mockStdout),
      },
      stderr: {
        on: mockOnCreator(mockStderr),
      },
      on: mockOnCreator([exitCode]),
    });

    const spawnMock = (command, args, options) => {
      return proc();
    };

    const logSpy = spy();

    const spawnMockSpy = spy(spawnMock);

    const testFnCreator = exitCode =>
      _spawnPromiseTestableCreator(spawnMock, logSpy)([exitCode])(
        command,
        args,
        options
      );

    const validateResolutionOrRejection = ({ code, stdout, stderr }) => {
      expect(code).to.equal(exitCode);
      expect(stdout).to.deep.equal(mockStdout.join(""));
      expect(stderr).to.deep.equal(mockStderr.join(""));
    };

    it("should curry on to return a promise to spawn a process", () =>
      testFnCreator(exitCode).then(validateResolutionOrRejection));

    it("should curry on to return a promise to spawn a process and fail if the exit code is not in the expected list", () =>
      testFnCreator(0).catch(validateResolutionOrRejection));
  });

  describe("spawnOptions()", () => {
    it("should return spawnOptions if both config and config.spawnOptions are defined", () => {
      const expected = uuid();
      const config = { spawnOptions: expected };

      expect(spawnOptions(config)).to.equal(expected);
    });

    it("should return undefined unless both config and config.spawnOptions are defined", () => {
      [undefined, {}].forEach(test => {
        expect(spawnOptions(test)).to.be.undefined;
      });
    });
  });
});
