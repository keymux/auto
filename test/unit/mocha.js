const { expect } = require("chai");
const { spy } = require("sinon");

const uuid = require("uuid");

const {
  otherOptions,
  reporters,
  reporterOptions,
  testFiles,
} = require("../../src/mocha");

const failArrays = [undefined, {}, { mocha: {} }];

const failTestCreator = fn =>
  failArrays.forEach(each => expect(fn(each)).to.be.undefined);

describe("mocha.js", () => {
  describe("otherOptions()", () => {
    it("should return otherOptions if both config and config.otherOptions are defined", () => {
      const expected = uuid();
      const config = { otherOptions: expected };

      expect(otherOptions(config)).to.equal(expected);
    });

    it("should return undefined unless both config and config.otherOptions are defined", () =>
      failTestCreator(otherOptions));
  });

  describe("reporters()", () => {
    it("should return reporters if both config and config.reporters are defined", () => {
      const expected = uuid();
      const config = { mocha: { reporters: expected } };

      expect(reporters(config)).to.equal(expected);
    });

    it("should return undefined unless both config and config.reporters are defined", () =>
      failTestCreator(reporters));
  });

  describe("reporterOptions()", () => {
    it("should return reporterOptions if both config and config.reporterOptions are defined", () => {
      const expected = uuid();
      const config = { mocha: { reporterOptions: expected } };

      expect(reporterOptions(config)).to.equal(expected);
    });

    it("should return undefined unless both config and config.reporterOptions are defined", () =>
      failTestCreator(reporterOptions));
  });

  describe("testFiles()", () => {
    it("should return testFiles if both config and config.testFiles are defined", () => {
      const expected = uuid();
      const config = { testFiles: expected };

      expect(testFiles(config)).to.equal(expected);
    });
    it("should return undefined unless both config and config.testFiles are defined", () =>
      failTestCreator(testFiles));
  });
});
