const { expect } = require("chai");
const { spy } = require("sinon");

const uuid = require("uuid");

const { _loadConfigCreator } = require("../../../src/config/load_config");

describe("load_config.js", () => {
  describe("_loadConfigCreator()", () => {
    let input;

    let configMock;

    let minimistResult;
    let minimistSpy;

    let statResult;
    let statPromiseSpy;

    let requireResult;
    let requireSpy;

    let resolveResult;
    let resolveSpy;

    const minimistMock = () => minimistResult;

    const statPromiseMock = () => Promise.resolve(statResult);

    const requireMock = () => requireResult;

    const resolveMock = () => resolveResult;

    beforeEach(() => {
      input = uuid();

      configMock = uuid();

      minimistResult = {
        config: uuid(),
      };

      statResult = {
        isFile: spy(() => true),
      };

      requireResult = uuid();

      minimistSpy = spy(minimistMock);
      statPromiseSpy = spy(statPromiseMock);
      requireSpy = spy(requireMock);
      resolveSpy = spy(resolveMock);
    });

    const testFn = (newMinimistResult, expectedResolve) => {
      minimistResult = newMinimistResult;
      expectedResolve = expectedResolve;

      return _loadConfigCreator(
        minimistSpy,
        { statPromise: statPromiseSpy },
        requireSpy,
        { resolve: resolveSpy }
      )(input).then(actual => {
        expect(minimistSpy.args).to.deep.equal([[input]]);
        expect(resolveSpy.args).to.deep.equal([[expectedResolve]]);
        expect(statPromiseSpy.args).to.deep.equal([[resolveResult]]);
        expect(statResult.isFile.args).to.deep.equal([[]]);
        expect(requireSpy.args).to.deep.equal([[resolveResult]]);

        return actual;
      });
    };

    it("should curry on to promise to load a config from file", () =>
      testFn({}, ".test.config.js").then(actual => {
        expect(actual).to.equal(requireResult);
      }));

    it("should curry on to promise to load a config from file specified by the user", () => {
      const config = uuid();

      return testFn({ config }, config).then(actual => {
        expect(actual).to.equal(requireResult);
      });
    });

    it("should resolve all the same if the file can't be loaded", () => {
      requireSpy = spy(() => Promise.reject());

      return testFn({}, ".test.config.js");
    });
  });
});
