import { getHashNumber } from "../day4";

describe("Advent of Code 2015", () => {
  describe("Day 4", () => {
    it("returns the number to have 5 leading zeroes in hash 1", () => {
      const actual = getHashNumber("abcdef", "00000");

      expect(actual).toBe(609043);
    });

    it("returns the number to have 5 leading zeroes in hash 2", () => {
      const actual = getHashNumber("ckczppom", "00000");

      expect(actual).toBe(117946);
    });

    it("returns the number to have 5 leading zeroes in hash 3", () => {
      const actual = getHashNumber("ckczppom", "000000");

      expect(actual).toBe(3938038);
    });
  });
});
