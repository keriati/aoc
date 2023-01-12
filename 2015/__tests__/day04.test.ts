import { getHashNumber } from "../day04";

describe("Advent of Code 2015", () => {
  describe("Day 4: The Ideal Stocking Stuffer", () => {
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
