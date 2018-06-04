const { expect } = require("chai");
const { spy } = require("sinon");

const uuid = require("uuid");

const { nycOptions } = require("../../src/nyc");

describe("nyc.js", () => {
  describe("nycOptions()", () => {
    it("should return nycOptions if both config and config.nycOptions are defined", () => {
      const expected = uuid();
      const config = { nycOptions: expected };

      expect(nycOptions(config)).to.equal(expected);
    });

    it("should return undefined unless both config and config.nycOptions are defined", () => {
      [undefined, {}].forEach(test => {
        expect(nycOptions(test)).to.be.undefined;
      });
    });
  });
});
